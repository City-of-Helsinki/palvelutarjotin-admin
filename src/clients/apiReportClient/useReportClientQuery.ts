import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import apiReportClient, { ROUTES } from './apiReportClient';

/**
 * A browser hack to download a file instead of just a byte string.
 */
function downloadFile(data: string, filename: string) {
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function useDownloadEventsEnrolmentsCsvQuery(pEventId: string | undefined) {
  const { t } = useTranslation();
  if (!pEventId) return undefined;
  return async () => {
    const filename = `kultus_events_approved_enrolments.csv`;
    const response = await apiReportClient.get(
      `${ROUTES.EVENTS_ENROLMENTS}?ids=${pEventId}`,
      {
        responseType: 'blob',
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          /* TODO: Accept and Content-Disposition headers would be good to have, 
          but they won't work until API supports them. */
          // Accept: 'text/csv; charset=utf-8',
          // 'Content-Disposition': `attachment; filename=${filename}`,
        },
      }
    );
    // Hack to download files with axios:
    // https://gist.github.com/javilobo8/097c30a233786be52070986d8cdb1743
    if (response.status === 200 && response?.data?.type === 'text/csv') {
      downloadFile(response.data, filename);
    } else {
      toast.error(t('eventEnrolmentsReport.downloadError'));
    }
  };
}

export { useDownloadEventsEnrolmentsCsvQuery };
