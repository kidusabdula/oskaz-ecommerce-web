// app/blog/[id]/page.tsx
import BlogDetails from "@/components/blog/Blog-Details";

interface BlogPageProps {
  params: {
    id: string;
  };
}

export default function BlogPage({ params }: BlogPageProps) {
  return <BlogDetails blogId={parseInt(params.id)} />;
}