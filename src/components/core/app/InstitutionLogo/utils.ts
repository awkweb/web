import colors from '../../../theme/colors'

/**
 * Gets institution color for id
 */
export const getColorForId = (id: string) => {
    switch (id) {
        case 'ins_1':
            return 'hsl(357, 79%, 52%)'
        case 'ins_3':
            return 'hsl(210, 84%, 36%)'
        case 'ins_4':
            return 'hsl(352, 74%, 47%)'
        case 'ins_5':
            return 'hsl(220, 61%, 32%)'
        case 'ins_9':
            return 'hsl(204, 100%, 23%)'
        case 'ins_10':
            return 'hsl(202, 100%, 38%)'
        case 'ins_51':
            return 'hsl(197, 100%, 47%)'
        default:
            return colors.gold2
    }
}

/**
 * Gets institution icon for id
 */
export const getIconForId = (id: string) => {
    switch (id) {
        case 'ins_1':
            return import(`../../icons/Icon/svgs/institutions/ins_1`)
        case 'ins_3':
            return import(`../../icons/Icon/svgs/institutions/ins_3`)
        case 'ins_4':
            return import(`../../icons/Icon/svgs/institutions/ins_4`)
        case 'ins_5':
            return import(`../../icons/Icon/svgs/institutions/ins_5`)
        case 'ins_9':
            return import(`../../icons/Icon/svgs/institutions/ins_9`)
        case 'ins_10':
            return import(`../../icons/Icon/svgs/institutions/ins_10`)
        case 'ins_51':
            return import(`../../icons/Icon/svgs/institutions/ins_51`)
        default:
            return import('../../icons/Icon/svgs/bank')
    }
}
