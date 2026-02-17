# 🔔 Notification System - Quick Setup Guide

## ⚡ Quick Start

### Step 1: Run Migration
```bash
cd JKG
node scripts/migrate-add-isviewed.js
```

This adds `isViewed` and `firstViewedAt` fields to existing inquiries.

### Step 2: Restart Server
```bash
npm run dev
```

### Step 3: Test
1. Open admin panel
2. Click bell icon in header
3. You should see pending inquiries
4. Change status of any inquiry
5. Notice notification disappears instantly
6. Change status back to "pending"
7. Inquiry should NOT reappear in notifications ✅

## 🎯 Key Features

### 1. Smart Filtering
- Only shows NEW inquiries (never touched by admin)
- Once status is changed, inquiry is marked as "viewed"
- Even if changed back to "pending", won't show in notifications

### 2. Real-time Updates
- Auto-refresh every 30 seconds
- Instant refresh when status changes
- No page reload needed

### 3. Two Types of Inquiries
- **Customer Inquiries** (Wholesale) - Purple icon
- **Product Inquiries** - Blue icon

## 🔧 How It Works

```
New Inquiry Created
    ↓
isViewed = false
    ↓
Shows in Notifications 🔔
    ↓
Admin Changes Status
    ↓
isViewed = true
firstViewedAt = now
    ↓
Removed from Notifications
    ↓
Even if status → "pending"
    ↓
Still isViewed = true
    ↓
Won't show in notifications ✅
```

## 📊 Database Schema

### CustomerInquiry & Inquiry Models
```javascript
{
  status: 'pending' | 'contacted' | 'quoted' | 'negotiating' | 'converted' | 'rejected',
  isViewed: Boolean,        // NEW: Tracks if admin touched this inquiry
  firstViewedAt: Date,      // NEW: When first viewed/modified
  // ... other fields
}
```

## 🚀 API Endpoints

### Get Notifications
```javascript
GET /api/admin/notifications

Response:
{
  success: true,
  data: [...notifications],
  counts: {
    total: 5,
    customerInquiries: 3,
    productInquiries: 2
  }
}
```

### Update Inquiry Status
```javascript
PUT /api/admin/customer-inquiries/:id
PUT /api/admin/inquiries/:id

Body: { status: 'contacted' }

// Automatically sets:
// - isViewed = true
// - firstViewedAt = now (if not already set)
```

## 🎨 UI Components

### Bell Icon Badge
- Shows total unviewed count
- Updates in real-time
- Max display: "9+"

### Notification Dropdown
- Click bell icon to open
- Shows last 10 unviewed inquiries
- Click notification → navigate to page
- Click outside → closes dropdown

## 🔄 Event System

### Trigger Refresh
```javascript
// From any admin page
window.dispatchEvent(new CustomEvent('refreshNotifications'));
```

### Listen for Refresh
```javascript
// In AdminHeader
window.addEventListener('refreshNotifications', fetchNotifications);
```

## ✅ Testing Checklist

- [ ] Migration script runs successfully
- [ ] Bell icon shows correct count
- [ ] Clicking bell opens dropdown
- [ ] Notifications display correctly
- [ ] Clicking notification navigates to page
- [ ] Changing status removes from notifications
- [ ] Changing back to pending doesn't re-add
- [ ] Real-time updates work without refresh
- [ ] Auto-refresh works (wait 30 seconds)
- [ ] Click outside closes dropdown

## 🐛 Troubleshooting

### Notifications not showing?
1. Check if inquiries exist with `status: 'pending'` and `isViewed: false`
2. Run migration script if upgrading from old version
3. Check browser console for errors

### Count not updating?
1. Check if event listener is attached
2. Verify `window.dispatchEvent` is called after status update
3. Check network tab for API calls

### Old inquiries still showing?
1. Run migration script: `node scripts/migrate-add-isviewed.js`
2. This sets `isViewed: false` for all existing inquiries

## 📝 Notes

- Migration is ONE-TIME only (for existing data)
- New inquiries automatically have `isViewed: false`
- System is production-ready
- No additional dependencies required

## 🎉 Done!

Your notification system is now ready. Admins will only see truly new inquiries, and notifications update in real-time without page refresh!
