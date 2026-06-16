"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface ToastItem {
  id: string;
  message: string;
  variant?: "success" | "error" | "info";
}

interface ToastContextValue {
  showToast: (message: string, variant?: ToastItem["variant"]) => void;
}

const ToastContext = createContext<ToastContextValue>({
  showToast: () => {},
});

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback(
    (message: string, variant: ToastItem["variant"] = "success") => {
      const id = Math.random().toString(36).slice(2);
      setToasts((prev) => [...prev, { id, message, variant }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 2800);
    },
    []
  );

  const borderColor = {
    success: "border-[#00f5ff] text-[#00f5ff]",
    error: "border-[#ff2d78] text-[#ff2d78]",
    info: "border-[#7b2fff] text-[#a855f7]",
  };

  const icon = { success: "✓", error: "✕", info: "◈" };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[999] flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className={`flex items-center gap-2.5 rounded-[6px] border bg-[#141928] px-5 py-3.5 font-mono text-[12px] tracking-[1px] shadow-lg ${
                borderColor[t.variant ?? "success"]
              }`}
            >
              <span>{icon[t.variant ?? "success"]}</span>
              {t.message.toUpperCase()}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
