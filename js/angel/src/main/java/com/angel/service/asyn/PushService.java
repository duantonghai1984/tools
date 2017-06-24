package com.angel.service.asyn;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.async.DeferredResult;

/**
 * @author BeautifulSoup Servlet3.0异步推送方式的Service,这就是定时任务
 */
@Service
public class PushService {
	// 在PushService中产生DefreeedResult给控制器使用,通过@Scheduled注解的方法定时更新DeferredResult
	private DeferredResult<String> deferredResult;

	public DeferredResult<String> getAsyncUpdate() {
		deferredResult = new DeferredResult<String>();
		return deferredResult;
	}

	@Scheduled(fixedDelay = 5000)
	public void refresh() {
		if (deferredResult != null) {
			deferredResult.setResult(new Long(System.currentTimeMillis()).toString());
		}
	}

}
