export const STATUS_MAP = {
  'all': { label: 'All' },
  'pending': { label: 'Pending', badgeClass: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300', dotClass: 'bg-gray-500' },
  'in-progress': { label: 'In Progress', badgeClass: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400', dotClass: 'bg-blue-500' },
  'under-review': { label: 'Under Review', badgeClass: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-400', dotClass: 'bg-yellow-500' },
  'resolved': { label: 'Resolved', badgeClass: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400', dotClass: 'bg-emerald-500' },
  'rejected': { label: 'Rejected', badgeClass: 'bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400', dotClass: 'bg-red-500' },
}

export const NOTIFICATION_TYPES = {
  status_change: 'Status Updated',
  review_added: 'Review Added',
  review_updated: 'Review Updated',
  review_removed: 'Review Removed',
}
