import { NextResponse } from 'next/server';

// Mock data - replace this with your actual API call
const mockProjects = [
  {
    "id": "e5fb39fa-1f80-449f-a6f0-1a0586bcda2e",
    "title": "etst",
    "slug": "etst",
    "description": "tetstxcxvzdv",
    "summary": "hi",
    "content": "**sfssd**",
    "images": [
      "https://cqqalnupkntijtqiyxws.supabase.co/storage/v1/object/public/project-images/projects/project-1758423102392-p345bo49f9n.jpg"
    ],
    "github": "https://github.com/example/project",
    "live": "https://example.com",
    "publishedAt": "2024-01-15",
    "team": [
      {
        "name": "John Doe",
        "role": "Developer",
        "avatar": "/images/avatar.jpg",
        "linkedIn": "https://linkedin.com/in/johndoe"
      }
    ]
  }
];

export async function GET() {
  try {
    // Replace this with your actual API call
    // const response = await fetch('YOUR_EXTERNAL_API_ENDPOINT');
    // const data = await response.json();
    
    // For now, return mock data
    return NextResponse.json({
      success: true,
      data: mockProjects
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}