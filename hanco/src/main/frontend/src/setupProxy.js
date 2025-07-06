const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            // target: <c:url value="/"/>,	// 서버 URL or localhost:설정한포트번호
            target: 'http://localhost:20000',	// 서버 URL or localhost:설정한포트번호 (port: 20000, 250706 기준)
            changeOrigin: true,
        })
    );
    // app.use(
    //     '/ws-stomp',
    //     createProxyMiddleware({
    //         target: 'http://localhost:8080',
    //         ws: true
    //     }),
    // )
};