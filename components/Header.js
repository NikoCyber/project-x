export default function Header({ header }) {
  return (
    <div className="flex-grow shadow-md h-13 md:ml-60">
      <div className="flex items-center px-10 py-4">
        <p className="items-center text-sm font-medium text-gray-700">
          {header}
        </p>
      </div>
    </div>
  )
}
