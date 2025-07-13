import UpdateApplicationForm from "../features/dashboard/UpdateApplicationForm";
import type { Application } from "@/app/types";

interface UpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  application: Application | null;
}

const UpdateApplicationFormModal = ({
  isOpen,
  onClose,
  application,
}: UpdateModalProps) => {
  if (!isOpen || !application) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-xl mx-4">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
        <UpdateApplicationForm
          application={application}
          isOpen={isOpen}
          onClose={onClose}
        />
      </div>
    </div>
  );
};

export default UpdateApplicationFormModal;
