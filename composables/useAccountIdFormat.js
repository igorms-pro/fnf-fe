export default function () {
  const formatAccountId = (addr, length = 8) =>
    addr.length === 64
      ? `${addr.slice(0, length)}...${addr.slice(-length)}`
      : addr

  const formatTransactionId = (txId, length = 5) => {
    if (txId) {
      return `${txId.slice(0, length)}...${txId.slice(-length)}`
    }
  }

  const regexNearWallet = (value) => {
    const reg = /^(.)?[a-z0-9-]+\.(near)(\.[a-z]{4})?$/
    const regex = new RegExp(reg)
    return regex.test(value)
  }
  const isNearWallet = (value) => {
    const reg = /(^(?!.*near.).*near$)|((?!.*testnet.).*testnet$)/
    const regex = new RegExp(reg)
    return regex.test(value)
  }

  return {
    formatTransactionId,
    formatAccountId,
    regexNearWallet,
    isNearWallet,
  }
}
