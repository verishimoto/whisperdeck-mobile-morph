import * as React from "react";
import { useEffect } from "react";
import { HackPrompt } from "@/types";
import { PromptCard } from "@/components/PromptCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface PromptCarouselProps {
  prompts: HackPrompt[];
}

export function PromptCarousel({ prompts }: PromptCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const autoplayPlugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  useEffect(() => {
    if (!api) return;

    const handleMouseEnter = () => autoplayPlugin.current.stop();
    const handleMouseLeave = () => autoplayPlugin.current.play();

    const viewport = api.rootNode();
    viewport.addEventListener("mouseenter", handleMouseEnter);
    viewport.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      viewport.removeEventListener("mouseenter", handleMouseEnter);
      viewport.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [api]);

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      <Carousel
        opts={{ align: "start", loop: true }}
        plugins={[autoplayPlugin.current]}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {prompts.map((prompt, index) => (
            <CarouselItem key={prompt.id} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
              <div className="h-full p-1">
                <PromptCard prompt={prompt} index={index} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-4 backdrop-blur-xl bg-white/10 border-white/20 hover:bg-white/20 text-white" />
        <CarouselNext className="-right-4 backdrop-blur-xl bg-white/10 border-white/20 hover:bg-white/20 text-white" />
      </Carousel>
    </div>
  );
}
