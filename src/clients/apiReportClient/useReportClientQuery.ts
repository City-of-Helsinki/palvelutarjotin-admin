import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import apiReportClient, { ROUTES } from './apiReportClient';

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
          'Content-Type': 'text/csv',
          Accept: 'text/csv; charset=utf-8',
          // 'Content-Disposition': `attachment; filename=${filename}`,
        },
      }
    );
    // Hack to download files with axios:
    // https://gist.github.com/javilobo8/097c30a233786be52070986d8cdb1743
    if (response.status === 200 && response?.data?.type === 'text/csv') {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } else {
      toast(t('eventEnrolmentsReport.downloadError'), {
        type: toast.TYPE.ERROR,
      });
    }
  };
}

export { useDownloadEventsEnrolmentsCsvQuery };
