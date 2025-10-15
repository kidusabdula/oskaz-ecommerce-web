// components/blog/blog-details.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Calendar, 
  Eye, 
  Clock, 
  User, 
  ArrowLeft, 
  Facebook,
  Twitter,
  Linkedin,
  Mail
} from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface BlogDetailsProps {
  blogId: number;
}

const BlogDetails = ({ blogId }: BlogDetailsProps) => {
  const [mounted, setMounted] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    const currentSectionRef = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }

    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
    };
  }, []);

  if (!mounted) return null;

  // Blog post data based on ID
  const blogPost = {
    1: {
      title: "Oskaz Import Signs Agreement with Mizan Tepi University for Smart Board Delivery",
      date: "01 July 2024",
      author: "Oskaz Team",
      category: "Education",
      hits: 283,
      readTime: "5 min read",
      image: "/blog-1.jpg",
      content: `
        <p>In a significant move to bolster educational technology, Oskaz Import has officially signed an agreement with Mizan Tepi University to provide a range of ICT devices. The partnership aims to enhance the university's technological capabilities, ensuring that both students and faculty have access to modern educational tools.</p>
        
        <p>Following the agreement, Oskaz Import successfully delivered and installed the ICT devices, marking a crucial step in improving the learning environment at Mizan Tepi University. This initiative is expected to facilitate a more interactive and engaging educational experience, aligning with the university's commitment to excellence in education.</p>
        
        <p>The delivered equipment includes state-of-the-art smart boards, interactive displays, and supporting infrastructure that will transform traditional classrooms into dynamic learning spaces. These technologies enable teachers to create more engaging lessons, facilitate collaborative learning, and provide students with hands-on experience with cutting-edge educational tools.</p>
        
        <p>"We are excited to collaborate with Mizan Tepi University," said a spokesperson from Oskaz Import. "Our goal is to empower educational institutions with the technology they need to thrive in today's digital age. This partnership represents our commitment to advancing education through technology."</p>
        
        <p>The university administration expressed gratitude for the timely delivery and installation of the devices, highlighting the importance of such partnerships in advancing their mission to provide quality education. The implementation of these technologies is expected to have a significant impact on student engagement, learning outcomes, and overall educational experience.</p>
        
        <p>As technology continues to evolve, this collaboration represents a proactive approach to integrating innovative solutions within the academic landscape. Both Oskaz Import and Mizan Tepi University are committed to ensuring that students are equipped with the digital literacy and technical skills necessary to succeed in the modern workforce.</p>
        
        <p>This partnership also includes comprehensive training for faculty members to ensure they can effectively utilize the new technologies in their teaching methods. Oskaz Import will provide ongoing technical support and maintenance to ensure the longevity and optimal performance of the installed systems.</p>
        
        <p>The successful implementation of this project serves as a model for other educational institutions looking to enhance their technological infrastructure. It demonstrates the potential of public-private partnerships in driving educational innovation and improving learning outcomes.</p>
        
        <p>For more information about Oskaz Import's educational technology solutions, please contact our team or visit our website to explore our range of products and services designed specifically for educational institutions.</p>
      `
    },
    2: {
      title: "Smart Meeting and Conference Room Solutions",
      date: "01 July 2024",
      author: "Tech Team",
      category: "Technology",
      hits: 143,
      readTime: "8 min read",
      image: "/blog-2.jpg",
      content: `
        <p>Using smart classrooms and smart video conferencing solutions, such as those provided by Dahua via Oskaz Import, offers several advantages for modern educational and business environments. These technologies transform traditional spaces into interactive, collaborative hubs that enhance productivity and engagement.</p>
        
        <h3>Uses of Smart Classrooms:</h3>
        <p>Smart classrooms represent a significant leap forward in educational technology, offering numerous benefits that enhance both teaching and learning experiences. These technologically advanced spaces incorporate interactive whiteboards, digital displays, and integrated software systems that create a more dynamic and engaging learning environment.</p>
        
        <p>Interactive learning is perhaps the most significant advantage of smart classrooms. Through digital boards and multimedia content, teachers can create more engaging lessons that capture students' attention and facilitate better understanding of complex concepts. The ability to incorporate videos, animations, and interactive elements into lessons helps accommodate different learning styles and keeps students actively involved in the learning process.</p>
        
        <p>Remote learning capabilities have become increasingly important in today's educational landscape. Smart classrooms enable distance education, allowing students to participate from anywhere, which is crucial for hybrid learning environments. This flexibility ensures that learning can continue uninterrupted, regardless of physical location or circumstances that might prevent in-person attendance.</p>
        
        <p>Real-time collaboration is another key benefit of smart classroom technology. These systems support group projects and discussions in real-time, even if participants are in different locations. Students can work together on shared documents, participate in group activities, and receive immediate feedback from teachers, creating a more collaborative and interactive learning experience.</p>
        
        <p>Data management is streamlined through integrated software that handles administrative tasks such as attendance tracking and grading. This automation reduces the administrative burden on teachers, allowing them to focus more on teaching and student engagement. It also provides valuable data insights that can help identify areas where students may need additional support.</p>
        
        <p>Enhanced communication between teachers and students is facilitated through tools like messaging and announcements. These features ensure that important information can be shared quickly and efficiently, keeping everyone informed and connected.</p>
        
        <h3>Uses of Smart Video Conferencing Solutions:</h3>
        <p>Smart video conferencing solutions have become essential tools in both educational and business settings, particularly in the wake of increased remote and hybrid work arrangements. These systems offer high-quality video and audio capabilities that create a more immersive and effective virtual meeting experience.</p>
        
        <p>High-quality video and audio are fundamental to effective virtual communication. Dahua's solutions provide clear, crisp video and audio that enhance the virtual classroom or meeting experience, ensuring that participants can see and hear each other clearly, which is crucial for effective communication and engagement.</p>
        
        <p>Screen sharing capabilities allow teachers and presenters to share presentations, documents, and other resources easily with students or meeting participants. This feature is particularly valuable for educational settings, where visual aids and demonstrations play a crucial role in the learning process.</p>
        
        <p>Recording and playback functionality enables sessions to be recorded for later review, which is beneficial for students who miss classes or want to revisit the material. This feature also allows for the creation of a library of educational content that can be accessed on-demand, providing flexibility for students to learn at their own pace.</p>
        
        <p>Integration with Learning Management Systems (LMS) ensures a seamless user experience by connecting video conferencing tools with existing educational platforms. This integration simplifies the process for both teachers and students, reducing the learning curve and making it easier to incorporate virtual sessions into the broader educational framework.</p>
        
        <p>Scalability is another important feature of these video conferencing solutions. The ability to support a large number of participants makes them suitable for lectures, workshops, and seminars, ensuring that they can accommodate various educational and business scenarios.</p>
        
        <h3>Benefits of Using Dahua's Solutions via Oskaz Import:</h3>
        <p>Dahua is known for its robust and reliable technology, ensuring a smooth user experience. Their solutions are designed with quality and performance in mind, providing users with dependable tools that enhance communication and collaboration.</p>
        
        <p>The user-friendly interface of Dahua's solutions simplifies the process for both teachers and students, reducing the learning curve and making it easier to adopt and use these technologies effectively. This ease of use is particularly important in educational settings, where both technical and non-technical users need to interact with the systems.</p>
        
        <p>Comprehensive support from Oskaz Import ensures that educators can maximize the use of these technologies. This support includes training, technical assistance, and ongoing maintenance, which are crucial for the successful implementation and long-term use of these systems.</p>
        
        <p>Customization options allow for tailored solutions to meet specific educational needs and environments. This flexibility ensures that the technology can be adapted to suit different teaching styles, classroom configurations, and institutional requirements.</p>
        
        <p>Overall, these technologies enhance the educational experience by making learning more engaging, accessible, and efficient. They represent a significant investment in the future of education, preparing students for success in an increasingly digital world.</p>
      `
    },
    3: {
      title: "Oskaz Import has officially signed an agreement with HD Focus Company",
      date: "10 October 2024",
      author: "Business Team",
      category: "Partnership",
      hits: 233,
      readTime: "4 min read",
      image: "/blog-3.jpg",
      content: `
        <p>Oskaz Import has officially signed an agreement with HD Focus Company, establishing them as the official partner in the Horn of Africa. This strategic partnership is set to enhance collaboration and drive growth in the region, leveraging the strengths of both companies to create new opportunities for development and investment.</p>
        
        <p>The alliance between Oskaz Import and HD Focus Company represents a significant milestone in the region's business landscape. By combining Oskaz Import's extensive experience in import, retail, and consultancy services with HD Focus Company's technological expertise and market presence, both companies are well-positioned to address the growing demand for innovative solutions in the Horn of Africa.</p>
        
        <p>This partnership will focus on several key areas, including the expansion of technological infrastructure, enhancement of service delivery, and development of customized solutions tailored to the specific needs of the region. By working together, the companies aim to create a more robust ecosystem that supports business growth and technological advancement.</p>
        
        <p>One of the primary objectives of this partnership is to improve business operations for clients across various sectors. Through the integration of HD Focus Company's cutting-edge technologies with Oskaz Import's comprehensive service offerings, clients will benefit from more efficient, effective, and innovative solutions that address their unique challenges and requirements.</p>
        
        <p>Market expansion is another key focus of this collaboration. By leveraging their combined networks and resources, Oskaz Import and HD Focus Company plan to extend their reach to new markets within the Horn of Africa, bringing their products and services to a broader audience and creating new opportunities for growth and development.</p>
        
        <p>The partnership also aims to drive investment in the region by creating a more attractive business environment. Through the development of innovative solutions and the enhancement of service quality, both companies hope to attract both local and international investment, contributing to the economic growth and development of the Horn of Africa.</p>
        
        <p>Customers of both companies can expect to benefit from this partnership through access to a wider range of products and services, improved support, and more innovative solutions. The collaboration will enable both companies to leverage their respective strengths to provide more comprehensive and effective solutions to their clients.</p>
        
        <p>This strategic alliance is built on a shared vision of excellence, innovation, and customer satisfaction. Both Oskaz Import and HD Focus Company are committed to maintaining the highest standards of quality and service, ensuring that their clients receive the best possible solutions and support.</p>
        
        <p>As the partnership develops, both companies plan to explore additional opportunities for collaboration, including joint research and development initiatives, training programs, and community engagement projects. These efforts will further strengthen their ability to serve the region and contribute to its growth and development.</p>
        
        <p>The official signing ceremony was attended by senior executives from both companies, who expressed their enthusiasm for the partnership and their commitment to its success. The event marked the beginning of what promises to be a fruitful collaboration that will benefit not only the companies involved but also the broader business community in the Horn of Africa.</p>
        
        <p>For more information about this partnership and the products and services offered by Oskaz Import and HD Focus Company, please contact our team or visit our websites. We look forward to serving you with our enhanced capabilities and expanded offerings.</p>
      `
    }
  };

  const post = blogPost[blogId as keyof typeof blogPost];
  const relatedPosts = Object.keys(blogPost)
    .filter(id => parseInt(id) !== blogId)
    .slice(0, 2)
    .map(id => blogPost[Number(id) as keyof typeof blogPost]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Blog post not found</h1>
          <Link href="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Education":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "Technology":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "Partnership":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  const shareOnSocial = (platform: string) => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const text = post.title;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
        break;
      case 'email':
        window.open(`mailto:?subject=${text}&body=${url}`, '_blank');
        break;
    }
  };

  return (
    <div ref={sectionRef} className="min-h-screen pt-20 md:pt-18">
      {/* Blog Header */}
      <div className={cn(
        "border-b py-6",
        isDarkMode ? "bg-card border-border" : "bg-white border-gray-200"
      )}>
        <div className="container mx-auto px-4">
          <Link href="/blog" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-2 md:mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2 md:mb-3">
                <Badge className={getCategoryColor(post.category)}>
                  {post.category}
                </Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="w-3 h-3 mr-1" />
                  {post.date}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Eye className="w-3 h-3 mr-1" />
                  {post.hits} views
                </div>
              </div>
              <h1 className="text-2xl font-bold tracking-tight md:text-4xl">
                {post.title}
              </h1>
            </div>
            
            <div className="flex items-center gap-2 md:gap-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <User className="w-3 h-3 mr-1" />
                {post.author}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="w-3 h-3 mr-1" />
                {post.readTime}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className={cn(
              "prose prose-lg max-w-none",
              isDarkMode && "prose-invert"
            )}>
              {/* Blog Image */}
              <div className="relative h-48 sm:h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center">
                      <Calendar className="w-10 h-10 text-white" />
                    </div>
                    <p className="text-sm text-muted-foreground">Blog Image</p>
                  </div>
                </div>
              </div>
              
              {/* Blog Content */}
              <div 
                className={cn(
                  "space-y-6",
                  isInView && "animate-fade-in"
                )}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
            
            {/* Share Section */}
            <div className="mt-12 pt-8 border-t">
              <h3 className="text-xl font-bold mb-4">Share this article</h3>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => shareOnSocial('facebook')}
                  className="rounded-full"
                >
                  <Facebook className="w-4 h-4 mr-2" />
                  Facebook
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => shareOnSocial('twitter')}
                  className="rounded-full"
                >
                  <Twitter className="w-4 h-4 mr-2" />
                  Twitter
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => shareOnSocial('linkedin')}
                  className="rounded-full"
                >
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => shareOnSocial('email')}
                  className="rounded-full"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Author Card */}
            <Card className={cn(
              "mb-6",
              isDarkMode ? "bg-card border-border" : "bg-white border-gray-200"
            )}>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">About the Author</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-4 sm:p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{post.author}</h4>
                    <p className="text-sm text-muted-foreground">Content Creator</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Passionate about technology and innovation, sharing insights and updates from Oskaz Import&#39;s journey.
                </p>
              </CardContent>
            </Card>
            
            {/* Related Posts */}
            <Card className={cn(
              isDarkMode ? "bg-card border-border" : "bg-white border-gray-200"
            )}>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Related Posts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-4 sm:p-6">
                {relatedPosts.map((relatedPost, index) => (
                  <div key={index} className="pb-4 border-b last:border-0 last:pb-0">
                    <Link href={`/blog/${Number(Object.keys(blogPost).find(key => blogPost[Number(key) as keyof typeof blogPost] === relatedPost))}`} className="block group">
                      <h3 className="font-medium group-hover:text-primary transition-colors line-clamp-2 mb-1">
                        {relatedPost.title}
                      </h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-3 h-3 mr-1" />
                        {relatedPost.date}
                      </div>
                    </Link>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;