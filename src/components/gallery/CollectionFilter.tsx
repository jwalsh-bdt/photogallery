import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export interface Collection {
  id: string;
  name: string;
  description?: string;
}

interface CollectionFilterProps {
  collections?: Collection[];
  activeCollection?: string;
  onSelectCollection?: (collectionId: string) => void;
}

const CollectionFilter = ({
  collections = [
    { id: "all", name: "All Photos" },
    { id: "landscapes", name: "Landscapes" },
    { id: "wildlife", name: "Wildlife" },
    { id: "portraits", name: "Portraits" },
    { id: "urban", name: "Urban" },
    { id: "abstract", name: "Abstract" },
  ],
  activeCollection = "all",
  onSelectCollection = () => {},
}: CollectionFilterProps) => {
  return (
    <div className="w-full py-6 ">
      <div className="container mx-auto px-4">
        <motion.div
          className="flex flex-wrap gap-2 justify-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {collections.map((collection) => (
            <Button
              key={collection.id}
              variant={
                activeCollection === collection.id ? "default" : "outline"
              }
              className={cn(
                "rounded-full px-6",
                activeCollection === collection.id
                  ? "border-2 border-white "
                  : "border-gray-700 text-gray-500 hover:text-white hover:bg-gray-800",
              )}
              onClick={() => onSelectCollection(collection.id)}
            >
              {collection.name}
            </Button>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CollectionFilter;
