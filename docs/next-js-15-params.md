# Handling Dynamic Route Parameters in Next.js 15

## Overview

In Next.js 15, dynamic route parameters (`params`) are now Promises that need to be awaited before accessing their properties. This document explains how to properly handle dynamic route parameters in your Next.js 15 application.

## The Problem

In previous versions of Next.js, you could directly access route parameters like this:

```tsx
// This worked in previous versions but causes errors in Next.js 15
export default function Page({ params }: { params: { id: string } }) {
  return <div>ID: {params.id}</div>
}
```

In Next.js 15, this will cause the following error:

```
Error: Route "/path/[id]" used `params.id`. `params` should be awaited before using its properties.
Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis
```

## The Solution

### 1. Make Your Page Component Async

The first step is to make your page component async and await the params:

```tsx
// Server component that handles the params
interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function Page({ params }: PageProps) {
  // Await the params before accessing properties
  const { id } = await params;
  
  return <div>ID: {id}</div>
}
```

### 2. Separate Server and Client Components

For more complex pages with client-side state and interactivity, it's best to separate your components:

1. **Server Component**: Handles awaiting the params
2. **Client Component**: Handles UI rendering and state management

```tsx
// Server component (page.tsx)
interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function Page({ params }: PageProps) {
  // Await the params before accessing properties
  const { id } = await params;
  
  return <ClientComponent id={id} />;
}
```

```tsx
// Client component (ClientComponent.tsx)
"use client"

import { useState, useEffect } from 'react';

export function ClientComponent({ id }: { id: string }) {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    // Fetch data using the id
    const fetchData = async () => {
      // ...
    };
    
    fetchData();
  }, [id]);
  
  return <div>Client component with ID: {id}</div>;
}
```

## Important Limitations

### Async/Await in Client Components

**Important**: async/await is only supported in Server Components, not in Client Components (marked with "use client"). If you try to use async/await in a Client Component, you'll get this error:

```
Error: async/await is not yet supported in Client Components, only Server Components. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.
```

To fix this:
1. Never mark a component with "use client" if it needs to use async/await directly
2. In Client Components, use promises with `.then()` or handle async operations in hooks like `useEffect`
3. Keep your async logic in Server Components and pass the resolved data to Client Components

### Correct Structure

```tsx
// ✅ Correct: Server Component with async/await
// page.tsx
export default async function Page({ params }) {
  const { id } = await params;
  const data = await fetchData(id);
  
  return <ClientComponent id={id} data={data} />;
}

// ✅ Correct: Client Component without async/await
// ClientComponent.tsx
"use client"
export function ClientComponent({ id, data }) {
  // Use the pre-fetched data from the server component
  return <div>{data}</div>;
}
```

### Incorrect Structure

```tsx
// ❌ Incorrect: Client Component with async/await
// page.tsx
"use client"
export default async function Page({ params }) { // This will cause an error
  const { id } = await params;
  return <div>{id}</div>;
}
```

## Best Practices

1. **Type Your Params Properly**: Always define the correct type for your params, including the Promise wrapper.

2. **Use Async/Await**: Make your page components async and await the params before accessing them.

3. **Separate Concerns**: Use server components for data fetching and client components for UI rendering and state management.

4. **Error Handling**: Add proper error handling for cases where params might be undefined or invalid.

5. **Debugging**: Add logging to track the flow of data and identify issues.

## Example: Business Unit Edit Page

Here's how we implemented this pattern in the Business Unit Edit page:

```tsx
// Server component (page.tsx)
interface EditBusinessUnitPageProps {
  params: Promise<{
    businessUnitId: string
  }>
}

export default async function EditBusinessUnitPage({ params }: EditBusinessUnitPageProps) {
  // Await the params before accessing properties
  const { businessUnitId } = await params;
  
  return <EditBusinessUnitClient businessUnitId={businessUnitId} />;
}
```

```tsx
// Client component (EditBusinessUnitClient.tsx)
"use client"

export function EditBusinessUnitClient({ businessUnitId }: { businessUnitId: string }) {
  // Client-side state and logic
  // ...
  
  return (
    // UI rendering
  );
}
```

## References

- [Next.js Documentation on Dynamic Route Parameters](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)
- [Next.js Error Message: sync-dynamic-apis](https://nextjs.org/docs/messages/sync-dynamic-apis) 