"use client";

import React, { useEffect, useRef, ReactNode, forwardRef } from "react";
import { X, Printer, Download } from "lucide-react";
import { ReportData } from "@/types/reports";

interface ReportModalProps {
  report: ReportData;
  children: ReactNode;
  onClose: () => void;
  onPrint: () => void;
  onDownload: () => void;
}

const ReportModal = forwardRef<HTMLDivElement, ReportModalProps>(
  ({ report, children, onClose, onPrint, onDownload }, ref) => {
    const backdropRef = useRef<HTMLDivElement>(null);

    // Close on ESC key
    useEffect(() => {
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleEsc);
      return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    // Click outside to close
    const handleBackdropClick = (e: React.MouseEvent) => {
      if (e.target === backdropRef.current) {
        onClose();
      }
    };

    // Trap focus inside modal
    const modalRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable?.[0];
      const last = focusable?.[focusable.length - 1];

      const trap = (e: KeyboardEvent) => {
        if (e.key !== "Tab") return;
        if (!focusable || focusable.length === 0) return;

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }
      };

      window.addEventListener("keydown", trap);
      return () => window.removeEventListener("keydown", trap);
    }, []);

    return (
      <div
        ref={backdropRef}
        onClick={handleBackdropClick}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      >
        <div
          ref={modalRef}
          className="bg-white rounded-lg shadow-xl w-full max-w-3xl p-6 relative overflow-y-auto max-h-[80vh] print:max-h-none print:overflow-visible"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between border-b pb-4 mb-4 print:hidden">
            <h2 className="text-xl font-semibold">{report.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-black"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>

          {/* Report Content */}
          <div ref={ref}>{children}</div>

          {/* Actions */}
          <div className="flex justify-end gap-4 mt-6 border-t pt-4 print:hidden">
            <button
              onClick={onPrint}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Printer size={16} className="mr-2" />
              Print
            </button>
            <button
              onClick={onDownload}
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              <Download size={16} className="mr-2" />
              Download
            </button>
          </div>
        </div>
      </div>
    );
  }
);

ReportModal.displayName = "ReportModal";

export default ReportModal;