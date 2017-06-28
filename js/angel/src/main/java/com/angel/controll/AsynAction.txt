package com.angel.controll;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.async.DeferredResult;

import com.angel.service.asyn.PushService;

@Controller
public class AsynAction {
	
	
	/*
	 
	 <script type="text/javascript">
        if (!!window.EventSource) { //EventSource是SSE的客户端.此时说明浏览器支持EventSource对象
            var source = new EventSource('push');//发送消息
            s = '';
            source.addEventListener('message', function(e) {
                s += e.data + "<br/>";
                $("#msgFromPush").html(s);
            });//添加客户端的监听

            source.addEventListener('open', function(e) {
                console.log("连接打开");
            }, false);

            source.addEventListener('error',function(e){
                if(e.readyState==EventSource.CLOSED){
                    console.log("连接关闭");
                }else{
                    console.log(e.readyState);
                }
            });
        }else{
            console.log("您的浏览器不支持SSE");
        }
    </script>
	 
	 */
	
	@RequestMapping(value="/push",produces="text/event-stream")
    public @ResponseBody String push(){
        Random r=new Random();
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return "data:Testing 1,2,3"+r.nextInt()+"\n\n";
    }
	
	
	
	@Autowired
    public PushService pushService;
	
	
	
	/**
	   服务器端轮训
	  <script type="text/javascript">
        deferred();

        function deferred() {
            $.get('defer', function(data) {
                console.log(data);
                deferred();
            });
        }
    </script>
	 
	 */
	
	@RequestMapping("/defer")
    @ResponseBody
    public DeferredResult<String> deferredCall(){
        return pushService.getAsyncUpdate();
    }

}
