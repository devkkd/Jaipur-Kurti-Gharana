import { NextResponse } from 'next/server';

// Public admin routes (no auth needed)
const publicAdminRoutes = [
  '/admin/login',
  '/admin',
];

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Check if it's an admin route
  const isAdminRoute = pathname.startsWith('/admin');
  
  if (!isAdminRoute) {
    return NextResponse.next();
  }

  // Check if it's a public admin route
  const isPublicRoute = publicAdminRoutes.some(route => pathname === route);
  
  if (isPublicRoute) {
    // If already logged in and trying to access login page, redirect to dashboard
    const token = request.cookies.get('admin-token')?.value;
    if (token && pathname === '/admin/login') {
      try {
        const parts = token.split('.');
        if (parts.length === 3) {
          const payload = JSON.parse(
            Buffer.from(parts[1].replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString()
          );
          // Check if token is not expired
          if (!payload.exp || payload.exp * 1000 > Date.now()) {
            return NextResponse.redirect(new URL('/admin/dashboard', request.url));
          }
        }
      } catch (error) {
        // Invalid token, let them access login page
      }
    }
    return NextResponse.next();
  }

  // All other admin routes need authentication
  const token = request.cookies.get('admin-token')?.value;

  if (!token) {
    // No token, redirect to login
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    // Simple JWT verification
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid token format');
    }

    // Decode payload (base64url decode)
    const payload = JSON.parse(
      Buffer.from(parts[1].replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString()
    );

    // Check expiry
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      throw new Error('Token expired');
    }

    // Token is valid, allow access
    return NextResponse.next();
  } catch (error) {
    // Token is invalid or expired
    console.error('JWT verification failed:', error.message);
    
    // Clear invalid token and redirect
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete('admin-token');
    
    return response;
  }
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    '/admin/:path*',
  ],
};
