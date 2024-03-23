import i18n from 'i18next'

export default function () {
  const ACTIVITY_TYPE = {
    LISTING: 'nft_on_approve',
    CANCEL_LISTING: 'remove_sale',
    SALE: 'resolve_purchase',
    BID: 'offer',
  }

  const activityTypeMapping = {
    [ACTIVITY_TYPE.LISTING]: {
      label: i18n.t('activity.type.listing'),
      color: 'text-black dark:text-white',
    },
    [ACTIVITY_TYPE.CANCEL_LISTING]: {
      label: i18n.t('activity.type.cancelListing'),
      color: 'text-grey-300 dark:text-white',
    },
    [ACTIVITY_TYPE.SALE]: {
      label: i18n.t('activity.type.sale'),
      color: 'text-green',
    },
    [ACTIVITY_TYPE.BID]: {
      label: i18n.t('activity.type.bid'),
      color: 'text-blue',
    },
  }
  return {
    activityTypeMapping,
  }
}
