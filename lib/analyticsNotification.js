import { Text, ActionIcon } from '@mantine/core'

function analyticsNotification(notifications, setApproval, setAnalytics) {

  const id = notifications.showNotification({
    autoClose: false,
    disallowClose: true,
    title: 'Do you consent to Google Analytic tracking?',
    id: 'google_analytics',
    message: (
      <>
        <div style={{ display: 'flex', paddingTop: 5 }}>
          <Text size="sm" sx={{ flex: 1, marginRight: 15 }}>
            You can change this in settings later.
          </Text>
          <ActionIcon
            onClick={() => {
              setApproval(true)
              setAnalytics(true)
              notifications.hideNotification(id)
            }}
            size={36}
            color="green"
            variant="hover"
          >
            Yes
          </ActionIcon>
          <ActionIcon
            onClick={() => {
              setApproval(false)
              setAnalytics(false)
              notifications.hideNotification(id)
            }}
            size={36}
            color="red"
            variant="hover"
          >
            No
          </ActionIcon>
        </div>
      </>
    )
  })

}

export {
  analyticsNotification
}
