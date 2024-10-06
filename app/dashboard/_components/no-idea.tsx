import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LightbulbIcon, PlusIcon, XIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";

function NoIdea() {
  const [isCreating, setIsCreating] = useState(false);
  const [newIdea, setNewIdea] = useState("");
  const [error, setError] = useState("");

  return (
    <Card className="mx-auto -mt-12 w-full max-w-md border-none shadow-none">
      <CardContent className="px-6 pb-6 pt-6">
        <AnimatePresence mode="wait">
          {!isCreating ? (
            <motion.div
              key="main"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center space-y-4 text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
              >
                <LightbulbIcon className="h-16 w-16 text-yellow-400" />
              </motion.div>
              <h2 className="text-primary text-2xl font-bold">
                No ideas to track
              </h2>
              <p className="text-muted-foreground">
                Get started by creating your first brilliant idea!
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="create"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <h3 className="text-primary text-xl font-semibold">
                What's your idea?
              </h3>
              <Input
                type="text"
                placeholder="Enter your idea here..."
                value={newIdea}
                onChange={(e) => setNewIdea(e.target.value)}
                className="w-full"
              />
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}

export default NoIdea;
