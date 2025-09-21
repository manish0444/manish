# API Integration for Projects

This portfolio now supports fetching project data from an API instead of using MDX files.

## How it works

1. **Projects Component**: The `Projects` component (`src/components/projects/Projects.tsx`) now tries to fetch data from an API first, and falls back to MDX files if the API is unavailable.

2. **Project Detail Page**: The project detail page (`src/app/projects/[slug]/page.tsx`) also tries to fetch individual projects from the API first.

3. **API Endpoint**: A local API endpoint is available at `/api/projects` (`src/app/api/projects/route.ts`) that returns project data in the expected format.

## API Data Format

The API should return data in this format:

```json
{
  "success": true,
  "data": [
    {
      "id": "unique-id",
      "title": "Project Title",
      "slug": "project-slug",
      "description": "Short description",
      "summary": "Project summary",
      "content": "**Markdown content**",
      "images": ["https://example.com/image1.jpg"],
      "github": "https://github.com/username/repo",
      "live": "https://project-live-url.com",
      "publishedAt": "2024-01-15",
      "team": [
        {
          "name": "Team Member",
          "role": "Developer",
          "avatar": "/images/avatar.jpg",
          "linkedIn": "https://linkedin.com/in/username"
        }
      ]
    }
  ]
}
```

## Environment Configuration

Add your API URL to the environment variables:

```env
NEXT_PUBLIC_API_URL=https://your-api-endpoint.com/projects
```

If not set, it defaults to `/api/projects` (the local endpoint).

## Features Added

1. **Live Project Links**: Shows "View Live Project" button when `live` URL is provided
2. **GitHub Links**: Shows "View on GitHub" button when `github` URL is provided
3. **Fallback Support**: Automatically falls back to MDX files if API is unavailable
4. **Enhanced Project Cards**: Project cards now show both live and GitHub links

## Replacing the Mock API

To use your own API:

1. Replace the mock data in `src/app/api/projects/route.ts` with a call to your actual API
2. Or set `NEXT_PUBLIC_API_URL` to point to your external API endpoint
3. Ensure your API returns data in the expected format shown above

## Migration

The system is backward compatible. If you want to keep using MDX files:
- Simply don't set the `NEXT_PUBLIC_API_URL` environment variable
- Or ensure your API returns an empty array or fails, and the system will fall back to MDX files