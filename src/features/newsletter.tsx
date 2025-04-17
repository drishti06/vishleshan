import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Subscription successful",
        description: "Thank you for subscribing to our newsletter!",
      });

      setEmail("");
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-muted py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <motion.div
          className="mx-auto max-w-[800px] rounded-xl bg-background p-8 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <Mail className="h-12 w-12 text-primary" />
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
                Subscribe to Our Newsletter
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground">
                Stay updated with our latest products, exclusive offers, and
                promotions.
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="mt-4 flex w-full max-w-md flex-col gap-2 sm:flex-row"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
            <p className="text-xs text-muted-foreground">
              By subscribing, you agree to our Terms of Service and Privacy
              Policy.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
