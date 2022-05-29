export default function Profile() {
  return (
    <div className="px-6 pt-4 pb-2">
      <a href="#!">
        <div className="flex items-center">
          <div className="shrink-0">
            <img
              src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp"
              className="w-10 rounded-full"
              alt="Avatar"
            />
          </div>
          <div className="ml-3 grow">
            <p className="text-sm font-semibold text-blue-600">Nikolai Boiko</p>
          </div>
        </div>
      </a>
    </div>
  )
}
