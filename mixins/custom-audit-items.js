import AuditItemFinalScreenshot from '~/components/GooglePageSpeedInsights/AuditItems/AuditItemFinalScreenshot';
import AuditItemFullPageScreenshot from '~/components/GooglePageSpeedInsights/AuditItems/AuditItemFullPageScreenshot';
import AuditItemMainthreadWorkBreakdown
  from '~/components/GooglePageSpeedInsights/AuditItems/AuditItemMainthreadWorkBreakdown';
import AuditItemLongTasks from '~/components/GooglePageSpeedInsights/AuditItems/AuditItemLongTasks';
import AuditItemNetworkRequests from '~/components/GooglePageSpeedInsights/AuditItems/AuditItemNetworkRequests';
import AuditItemRenderBlockingResources
  from '~/components/GooglePageSpeedInsights/AuditItems/AuditItemRenderBlockingResources';

export default {
  components: {
    AuditItemFinalScreenshot,
    AuditItemFullPageScreenshot,
    AuditItemMainthreadWorkBreakdown,
    AuditItemLongTasks,
    AuditItemNetworkRequests,
    AuditItemRenderBlockingResources
  },
  data() {
    return {
      customExpansions: {
        'final-screenshot': 'AuditItemFinalScreenshot',
        'full-page-screenshot': 'AuditItemFullPageScreenshot',
        'mainthread-work-breakdown': 'AuditItemMainthreadWorkBreakdown',
        'long-tasks': 'AuditItemLongTasks',
        'network-requests': 'AuditItemNetworkRequests',
        'render-blocking-resources': 'AuditItemRenderBlockingResources'
      }
    };
  }
};
