// app/blog/[id]/page.tsx
import BlogDetails from "@/components/blog/Blog-Details";

interface BlogPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { id } = await params;
  return <BlogDetails blogId={parseInt(id)} />;
}
