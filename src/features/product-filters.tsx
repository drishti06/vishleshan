import { useState } from "react"
import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

export function ProductFilters() {
  const [priceRange, setPriceRange] = useState([0, 500])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const handleColorChange = (color: string) => {
    setSelectedColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]))
  }

  const handleReset = () => {
    setPriceRange([0, 500])
    setSelectedCategories([])
    setSelectedColors([])
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button variant="ghost" size="sm" onClick={handleReset}>
          Reset
        </Button>
      </div>
      <div className="space-y-4">
        <Accordion type="single" collapsible defaultValue="categories">
          <AccordionItem value="categories">
            <AccordionTrigger>Categories</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="electronics"
                    checked={selectedCategories.includes("electronics")}
                    onCheckedChange={() => handleCategoryChange("electronics")}
                  />
                  <Label htmlFor="electronics" className="text-sm font-normal">
                    Electronics
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="clothing"
                    checked={selectedCategories.includes("clothing")}
                    onCheckedChange={() => handleCategoryChange("clothing")}
                  />
                  <Label htmlFor="clothing" className="text-sm font-normal">
                    Clothing
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="accessories"
                    checked={selectedCategories.includes("accessories")}
                    onCheckedChange={() => handleCategoryChange("accessories")}
                  />
                  <Label htmlFor="accessories" className="text-sm font-normal">
                    Accessories
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="home"
                    checked={selectedCategories.includes("home")}
                    onCheckedChange={() => handleCategoryChange("home")}
                  />
                  <Label htmlFor="home" className="text-sm font-normal">
                    Home & Kitchen
                  </Label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="price">
            <AccordionTrigger>Price Range</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <Slider
                  defaultValue={[0, 500]}
                  max={500}
                  step={10}
                  value={priceRange}
                  onValueChange={(value) => setPriceRange(value as [number, number])}
                />
                <div className="flex items-center justify-between">
                  <span className="text-sm">${priceRange[0]}</span>
                  <span className="text-sm">${priceRange[1]}</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="colors">
            <AccordionTrigger>Colors</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="black"
                    checked={selectedColors.includes("black")}
                    onCheckedChange={() => handleColorChange("black")}
                  />
                  <Label htmlFor="black" className="text-sm font-normal">
                    Black
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="white"
                    checked={selectedColors.includes("white")}
                    onCheckedChange={() => handleColorChange("white")}
                  />
                  <Label htmlFor="white" className="text-sm font-normal">
                    White
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="blue"
                    checked={selectedColors.includes("blue")}
                    onCheckedChange={() => handleColorChange("blue")}
                  />
                  <Label htmlFor="blue" className="text-sm font-normal">
                    Blue
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="red"
                    checked={selectedColors.includes("red")}
                    onCheckedChange={() => handleColorChange("red")}
                  />
                  <Label htmlFor="red" className="text-sm font-normal">
                    Red
                  </Label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </motion.div>
  )
}
