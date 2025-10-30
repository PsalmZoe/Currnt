"use client"

import { useState, useEffect } from "react"
import { Lightbulb } from "lucide-react"

interface Fact {
  id: number
  title: string
  description: string
  image: string
  category: string
}

const FACTS_DATA: Fact[] = [
  {
    id: 1,
    title: "Honey Never Spoils",
    description:
      "Archaeologists have found 3,000-year-old honey in Egyptian tombs that was still perfectly edible. Honey's natural acidity and low moisture content create an environment where bacteria cannot survive. This remarkable preservation ability has made honey one of the few foods that can last indefinitely when stored properly in sealed containers.",
    image: "/honey-jar-ancient.jpg",
    category: "Nature",
  },
  {
    id: 2,
    title: "Octopuses Have Three Hearts",
    description:
      "Two hearts pump blood to the gills, while the third pumps it to the rest of the body. Remarkably, when an octopus swims, the heart that delivers blood to the body actually stops beating, which is why these creatures prefer to crawl rather than swim. This unique circulatory system is one of the reasons octopuses are considered among the most intelligent invertebrates.",
    image: "/underwater-octopus.jpg",
    category: "Marine Life",
  },
  {
    id: 3,
    title: "Bananas Are Berries",
    description:
      "Botanically speaking, bananas are berries, but strawberries are not! A berry is defined as a fruit that develops from a single flower's ovary and contains seeds. Bananas fit this definition perfectly, while strawberries are actually aggregate fruits. This botanical classification often surprises people who think of berries as small, round fruits.",
    image: "/bananas-fruit.jpg",
    category: "Food",
  },
  {
    id: 4,
    title: "Penguins Propose with Pebbles",
    description:
      "Male penguins present pebbles to females as a form of proposal during mating season. This charming behavior is a critical part of penguin courtship rituals. The female penguin will accept the pebble if she's interested in the male, and together they use these pebbles to build and maintain their nests, creating a beautiful symbol of commitment.",
    image: "/penguin-pebble.jpg",
    category: "Animals",
  },
  {
    id: 5,
    title: "Venus Rotates Backwards",
    description:
      "Venus is the only planet in our solar system that rotates clockwise when viewed from above, which is opposite to most other planets. Scientists believe this unusual rotation may have resulted from a massive collision early in Venus's formation. Additionally, Venus rotates so slowly that a day on Venus is longer than its year!",
    image: "/venus-planet-space.jpg",
    category: "Space",
  },
  {
    id: 6,
    title: "Tardigrades Survive Space",
    description:
      "Microscopic tardigrades, also known as water bears, can survive extreme temperatures ranging from near absolute zero to over 300 degrees Fahrenheit. They've been sent to space and survived the vacuum, radiation, and extreme conditions. These incredible creatures can enter a state called cryptobiosis, where they suspend all biological activity until conditions improve.",
    image: "/tardigrade-microscopic.jpg",
    category: "Science",
  },
  {
    id: 7,
    title: "Dolphins Sleep with One Eye Open",
    description:
      "Dolphins have a unique ability to sleep with only half of their brain at a time, keeping one eye open to watch for predators and remember to breathe. This phenomenon is called unihemispheric sleep. This adaptation allows dolphins to rest while remaining alert to their environment, a critical survival mechanism in the ocean.",
    image: "/dolphin-sleeping-ocean.jpg",
    category: "Marine Life",
  },
  {
    id: 8,
    title: "Butterflies Taste with Their Feet",
    description:
      "Butterflies have taste receptors on their feet, allowing them to taste plants when they land on them. This helps them identify which plants are suitable for laying their eggs. The caterpillars that hatch will feed on these plants, so the mother butterfly's ability to taste ensures her offspring will have proper nutrition.",
    image: "/butterfly-flower.jpg",
    category: "Insects",
  },
  {
    id: 9,
    title: "Sharks Have Been Around Longer Than Dinosaurs",
    description:
      "Sharks have existed for over 450 million years, making them older than dinosaurs by about 200 million years. They've survived multiple mass extinction events and have remained relatively unchanged due to their perfect adaptation to ocean life. This makes sharks one of the most successful predators in Earth's history.",
    image: "/great-white-shark-ocean.jpg",
    category: "Marine Life",
  },
  {
    id: 10,
    title: "Wombats Have Cube-Shaped Poop",
    description:
      "Wombats produce cube-shaped droppings, which is unique among all animals. Scientists believe this shape helps mark territory as the cubic feces don't roll away and stay in place on rocks and logs. The wombat's intestines are specially adapted to create this distinctive shape, making them one of nature's most unusual animals.",
    image: "/wombat-animal.jpg",
    category: "Animals",
  },
  {
    id: 11,
    title: "Clownfish Can Change Gender",
    description:
      "Clownfish live in a strict social hierarchy, and if the dominant female dies, the dominant male can change into a female to take her place. This remarkable ability allows the species to continue reproducing even when circumstances change. The remaining males then establish a new hierarchy, with the largest becoming the breeding male.",
    image: "/clownfish-coral-reef.jpg",
    category: "Marine Life",
  },
  {
    id: 12,
    title: "Hummingbirds Can Fly Backwards",
    description:
      "Hummingbirds are the only birds that can fly backwards, thanks to their unique wing structure that allows them to rotate their wings in a figure-eight pattern. Their wings beat up to 80 times per second, enabling them to hover in place and move in any direction. This incredible agility makes them perfectly adapted for feeding on nectar from flowers.",
    image: "/hummingbird-flying.jpg",
    category: "Birds",
  },
]

export function DidYouKnowFacts() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % FACTS_DATA.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const currentFact = FACTS_DATA[currentIndex]

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-b from-primary/5 to-secondary/5 border-t border-border">
      {/* Header - Made text white */}
      <div className="flex items-center gap-2 p-4 border-b border-border">
        <Lightbulb className="h-5 w-5 text-white flex-shrink-0" />
        <h3 className="text-sm font-bold text-white">Did You Know?</h3>
      </div>

      {/* Facts Container - Vertical Auto-Scroll */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="relative flex-1 flex flex-col transition-all duration-500">
          {/* Fact Card */}
          <div key={currentFact.id} className="flex-1 flex flex-col p-3 animate-fade-in">
            <div className="relative h-32 rounded-lg overflow-hidden mb-3 bg-muted flex-shrink-0">
              <img
                src={currentFact.image || "/placeholder.svg"}
                alt={currentFact.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/news-collage.png"
                }}
              />
              <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded text-xs font-semibold">
                {currentFact.category}
              </div>
            </div>

            {/* Content - Made text white and expanded description display */}
            <div className="flex-1 flex flex-col min-h-0">
              <h4 className="font-bold text-sm text-white line-clamp-2 mb-1">{currentFact.title}</h4>
              <p className="text-xs text-white line-clamp-5 flex-1 leading-relaxed">{currentFact.description}</p>
            </div>
          </div>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-1 p-3 border-t border-border overflow-x-auto">
          {FACTS_DATA.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all flex-shrink-0 ${
                index === currentIndex ? "bg-white w-4" : "bg-muted w-1.5"
              }`}
              aria-label={`Go to fact ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
      `}</style>
    </div>
  )
}
