import { NextResponse } from "next/server";

export async function GET() {
  // TODO: Fetch articles or return fallback resource array as JSON
  try {
    let devApiUrl = "https://dev.to/api/articles?per_page=6&tag=webdev";

    const response = await fetch(devApiUrl, {
      headers: {
        "User-Agent": "StudentFlowApp",
      },
    });
    if (!response.ok) {
      throw new Error(`DEV API responded with status: ${response.status}`);
    }

    const articles = await response.json();

    const formattedResources = articles.map((article) => ({
      id: `dev-${article.id}`,
      title: article.title,
      description: article.description || "No description provided.",
      type: article.type_of,
      url: article.url,
      tag: article.tag_list[0] || "",
      author: article.user?.name || "Unknown Author",
      readingTime: article.reading_time_minutes
        ? `${article.reading_time_minutes} min read`
        : "Quick read",
    }));

    return NextResponse.json({ resources: formattedResources });
  } catch (error) {
    console.error("Failed to fetch DEV articles:", error);

    return NextResponse.json(
      { error: "Failed to fetch articles from DEV.to" },
      { status: 500 },
    );
  }
}
