# Toast Notifications System

This project uses React-Toastify for displaying user-friendly error and success messages. The toast system is already integrated throughout the authentication flow and provides utilities for handling API errors consistently.

## Setup

The toast system is already set up in the main App component with:

- ToastContainer configured with optimal settings
- CSS imports for styling
- Error handlers integrated into useAuth hook

## Basic Usage

### Import Toast Utilities

```typescript
import { toastUtils, showApiError, showSuccessMessage } from "../utils/toast";
```

### Simple Toast Messages

```typescript
// Success message
toastUtils.success("Operation completed successfully!");

// Error message
toastUtils.error("Something went wrong!");

// Warning message
toastUtils.warning("Please be careful!");

// Info message
toastUtils.info("Here's some information");

// Dismiss all toasts
toastUtils.dismiss();
```

### API Error Handling

#### Automatic Error Handling (useAuth example)

The `useAuth` hook already includes automatic toast notifications:

```typescript
const { login, register, logout } = useAuth();

// These automatically show success/error toasts:
await login(credentials); // Shows "Successfully logged in!" or error
await register(userData); // Shows "Account created successfully!" or error
await logout(); // Shows "Successfully logged out!" or error
```

#### Manual API Error Handling

For custom API calls, simply use the toast utilities directly:

```typescript
import { showApiError, showSuccessMessage } from "../utils/toast";

// In your component
const handleApiCall = async () => {
  try {
    const result = await someApiMutation(data).unwrap();
    showSuccessMessage("save"); // Uses predefined message
    // or
    toastUtils.success("Custom success message!");
  } catch (error) {
    showApiError(error); // Automatically extracts and shows appropriate error
  }
};

// Example with custom messages
const handleDeleteItem = async (id: string) => {
  try {
    await deleteItemMutation(id).unwrap();
    toastUtils.success("Item deleted successfully!");
  } catch (error) {
    showApiError(error);
  }
};

// Example with conditional success messages
const handleUpdateProfile = async (userData: UserData) => {
  try {
    await updateUserMutation(userData).unwrap();
    showSuccessMessage("update"); // Shows "Successfully updated!"
  } catch (error) {
    showApiError(error);
  }
};
```

## Error Message Extraction

The `getErrorMessage` function automatically handles various error formats:

- RTK Query errors
- Axios errors
- Validation errors with field-specific messages
- HTTP status codes with appropriate messages
- Fallback messages for unknown errors

## Available Predefined Success Messages

- `login` → "Successfully logged in!"
- `register` → "Account created successfully!"
- `logout` → "Successfully logged out!"
- `update` → "Successfully updated!"
- `delete` → "Successfully deleted!"
- `create` → "Successfully created!"
- `save` → "Successfully saved!"

## Customization

### Toast Options

All toast functions accept optional configuration:

```typescript
toastUtils.success("Message", {
  autoClose: 3000, // Auto close after 3 seconds
  position: "bottom-right", // Different position
  hideProgressBar: true, // Hide progress bar
  closeOnClick: false, // Don't close on click
  pauseOnHover: false, // Don't pause on hover
  theme: "dark", // Dark theme
});
```

### Global Configuration

Modify the ToastContainer in `App.tsx` to change global settings:

```typescript
<ToastContainer
  position="top-center"      // Change default position
  autoClose={3000}          // Change default auto-close time
  theme="dark"              // Change theme
  // ... other options
/>
```

## Best Practices

1. **Use automatic error handling** when possible (like with useAuth)
2. **Use `showApiError`** for API errors instead of manual error messages
3. **Use predefined success messages** when available
4. **Don't show duplicate errors** - if your hook handles errors, don't handle them again in components
5. **Keep messages concise** and user-friendly
6. **Use appropriate toast types** (success, error, warning, info)
7. **Consider UX** - don't overwhelm users with too many toasts

## Migration from Inline Errors

If you have components showing inline errors, you can migrate them:

### Before (inline errors):

```typescript
{error && (
  <div className="text-red-600 text-sm mt-2">
    {error}
  </div>
)}
```

### After (toast notifications):

```typescript
// Remove inline error display
// Error handling is now done in the API call or hook
```

## Troubleshooting

### Toasts not appearing

- Check that ToastContainer is rendered in App.tsx
- Verify CSS is imported: `import "react-toastify/dist/ReactToastify.css"`

### Duplicate error messages

- Make sure you're not handling errors both in hooks and components
- Use `suppressErrorToast` flag in axios base query if needed

### Custom styling

- Override CSS classes or use the `className` prop on ToastContainer
- Use the `theme` prop for built-in dark/light themes
