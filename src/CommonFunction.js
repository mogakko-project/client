export function calculateDday(deadline) {
    const deadlineDay = new Date(deadline)
    const today = new Date()
    const diff = deadlineDay - today

    const diffDay = Math.floor(diff / (1000*60*60*24))
    if (diffDay < 0) return '마감'
    else if (diffDay < 1) return 'D-day'
    else return 'd-' + diffDay
}