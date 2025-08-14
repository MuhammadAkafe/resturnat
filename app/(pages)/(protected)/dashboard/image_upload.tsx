"use client";

interface ImageUploadProps {
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imagePreview: string | null;
  setImagePreview: (value: string | null) => void;
}

function ImageUpload({
  handleImageChange,
  imagePreview,
  setImagePreview,
}: ImageUploadProps) {
  return (
    <div>
      <label
        htmlFor="url"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Image Upload
      </label>
      <div className="relative">
        <input
          type="file"
          id="url"
          name="url"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          required
        />
        <label
          htmlFor="url"
          className={`flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors duration-200 ${
            imagePreview ? "border-blue-400 bg-blue-50" : ""
          }`}
        >
          {imagePreview ? (
            <div className="relative w-full h-full">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  const fileInput = document.getElementById(
                    "url"
                  ) as HTMLInputElement;
                  if (fileInput) fileInput.value = "";
                  setImagePreview(null);
                }}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
              >
                ×
              </button>
            </div>
          ) : (
            <div className="text-center px-4 py-6">
              <svg
                className="mx-auto h-8 w-8 text-gray-400 mb-2"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-sm text-gray-600">
                <span className="font-medium text-blue-600 hover:text-blue-500">
                  Click to upload
                </span>{" "}
                or drag and drop
              </p>
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          )}
        </label>
      </div>
    </div>
  );
}
export default ImageUpload;
