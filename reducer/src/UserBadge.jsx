function UserBadge({ user, dispatch }) {
  return (
    <div className="mb-3 flex items-center justify-between rounded-xl border border-neutral-200 bg-white px-4 py-3 dark:border-neutral-800 dark:bg-neutral-900">
      <p className="text-sm text-neutral-700 dark:text-neutral-200">
        Salom, <span className="font-medium">{user.name || user.email}</span>
      </p>
      <button
        onClick={() => dispatch({ type: 'logged-out' })}
        className="text-xs text-neutral-400 hover:text-red-500"
      >
        Chiqish
      </button>
    </div>
  )
}

export default UserBadge
