import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const categories = [
  {
    id: 1,
    name: "Electronics",
    description: "Latest gadgets and tech accessories",
    image: "/placeholder.svg",
    slug: "electronics",
  },
  {
    id: 2,
    name: "Clothing",
    description: "Trendy apparel for all seasons",
    image: "/placeholder.svg",
    slug: "clothing",
  },
  {
    id: 3,
    name: "Home & Kitchen",
    description: "Essential items for your living space",
    image: "/placeholder.svg",
    slug: "home-kitchen",
  },
];

export function CategoryShowcase() {
  return (
    <section className="bg-muted py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Shop by Category
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Browse our wide selection of products across various categories.
            </p>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    width={600}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold">{category.name}</h3>
                  <p className="mt-2 text-muted-foreground">
                    {category.description}
                  </p>
                  <div className="mt-4">
                    <Link to={`/categories/${category.slug}`}>
                      <Button variant="outline" className="w-full">
                        Explore {category.name}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
