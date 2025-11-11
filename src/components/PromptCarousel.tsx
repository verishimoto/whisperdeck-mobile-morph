import * as React from "react";
import { useEffect, useCallback } from "react";
import { HackPrompt } from "@/types";
import { PromptCard } from "@/components/PromptCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface PromptCarouselProps {
  prompts: HackPrompt[];
}

export function PromptCarousel({ prompts }: PromptCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const autoplayPlugin = React.useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    })
  );

  useEffect(() => {
    if (!api) return;

    const handleMouseEnter = () => {
      autoplayPlugin.current.stop();
    };

    const handleMouseLeave = () => {
      autoplayPlugin.current.play();
    };

    const viewport = api.rootNode();
    viewport.addEventListener("mouseenter", handleMouseEnter);
    viewport.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      viewport.removeEventListener("mouseenter", handleMouseEnter);
      viewport.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [api]);

  return (
    <div className="w-full max-w-7xl mx-auto px-12">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[autoplayPlugin.current]}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent>
          {prompts.map((prompt, index) => (
            <CarouselItem key={prompt.id} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-2">
                <PromptCard prompt={prompt} index={index} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="glass-card border-white/20 hover:bg-white/10 text-white" />
        <CarouselNext className="glass-card border-white/20 hover:bg-white/10 text-white" />
      </Carousel>
    </div>
  );
}
