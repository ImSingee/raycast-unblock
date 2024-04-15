import{_ as e,c as t,o as a,a4 as o}from"./chunks/framework.DCrfWSmk.js";const b=JSON.parse('{"title":"Intercept Raycast","description":"","frontmatter":{},"headers":[],"relativePath":"guide/intercept-raycast.md","filePath":"guide/intercept-raycast.md","lastUpdated":1713145951000}'),s={name:"guide/intercept-raycast.md"},i=o(`<h1 id="intercept-raycast" tabindex="-1">Intercept Raycast <a class="header-anchor" href="#intercept-raycast" aria-label="Permalink to &quot;Intercept Raycast&quot;">​</a></h1><p>We need to intercept Raycast requests and route them through Raycast Unblock to unlock Pro features.</p><h2 id="universal-solution" tabindex="-1">Universal Solution <a class="header-anchor" href="#universal-solution" aria-label="Permalink to &quot;Universal Solution&quot;">​</a></h2><p>You can use Rewrite Header to rewrite Raycast&#39;s request to Raycast Unblock. This is a universal solution. Rewrite Header is a function that most proxy software have. However, it&#39;s important to note that:</p><div class="danger custom-block"><p class="custom-block-title">DANGER</p><p>Raycast Unblock&#39;s request <strong><em>cannot be processed</em></strong> by Rewrite Header, or it will cause an infinite loop.</p></div><p>For example, in Surge, you can add content like the following to your configuration file:</p><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>[URL Rewrite]</span></span>
<span class="line"><span>https:\\/\\/backend.raycast.com http://192.168.x.x:3000 header</span></span></code></pre></div><h2 id="use-it-with-surge-scripts-not-recommend" tabindex="-1">Use it with Surge Scripts (Not recommend) <a class="header-anchor" href="#use-it-with-surge-scripts-not-recommend" aria-label="Permalink to &quot;Use it with Surge Scripts (Not recommend)&quot;">​</a></h2><div class="note custom-block github-alert"><p class="custom-block-title">NOTE</p><p>In some cases, if you find that Raycast Unblock is not working properly, please go to the settings of Surge, and uncheck the last line <code>*</code> in <code>Surge -&gt; HTTP -&gt; Capture(捕获) -&gt; Capture MITM Overrides(捕获 MITM 覆写)</code>, which is <code>Modify MITM Hostname</code>.</p></div><ol><li>Go to <a href="https://github.com/wibus-wee/activation-script" target="_blank" rel="noreferrer">wibus-wee/activation-script</a> and follow the installation instructions.</li><li>Run Raycast Unblock and Surge.</li><li>Open Raycast and use the features in the Pro Plan.</li></ol><div class="tip custom-block github-alert"><p class="custom-block-title">TIP</p><p>Currently, <code>activation-script</code> will not forward the requests of <code>Translate</code> and <code>me</code> to Raycast Unblock by default. Instead, it will immediately forward the requests to DeepL or handle them itself in the script. You need to modify the code manually. Please refer to the documentation of activation-script for details.</p></div><h2 id="if-you-don-t-have-surge" tabindex="-1">If you don&#39;t have Surge <a class="header-anchor" href="#if-you-don-t-have-surge" aria-label="Permalink to &quot;If you don&#39;t have Surge&quot;">​</a></h2><p>You need to throw all Raycast requests to the backend built by this project, but make sure that the backend <strong>can request Raycast Backend normally</strong>, because some functions need to request Raycast Backend once and then do it.</p><ol><li><p>You can use Rewrite Header to implement this function - <a href="#universal-solution">Universal Solution</a>.</p></li><li><p>You can refer to the code in <a href="https://github.com/wibus-wee/activation-script" target="_blank" rel="noreferrer">wibus-wee/activation-script</a> and port it to other agent tools to continue using MiTM to hijack.</p></li><li><p>You can edit the <code>/etc/hosts</code> file to implement interception, but this method only supports Raycast Unblock deployments in remote locations. - <a href="#hosts">Hosts</a></p></li></ol><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>If you are building the backend locally, please do not let your proxy tool proxy both Raycast&#39;s requests and the backend service&#39;s requests, as this will cause it to not work properly.</p><p>Or you can deploy the backend to a remote server, and this will not be a problem.</p></div><h3 id="more" tabindex="-1">More <a class="header-anchor" href="#more" aria-label="Permalink to &quot;More&quot;">​</a></h3><p>Raycast Unblock adds an <code>x-raycast-unblock</code> header to requests to Raycast Backend.</p><p>You can determine whether this is a request from Raycast or Raycast Unblock by the presence of this header, and make the backend service work properly through conditional judgment. (Raycast Unblock has turned off SSL check by default)</p><p><a href="https://github.com/wibus-wee/activation-script/blob/main/src/modules/index.ts#L70-L89" target="_blank" rel="noreferrer">Related Code in activation-script</a></p><h2 id="hosts" tabindex="-1">Hosts <a class="header-anchor" href="#hosts" aria-label="Permalink to &quot;Hosts&quot;">​</a></h2><div class="danger custom-block"><p class="custom-block-title">DANGER</p><p>This method can only be used when the backend is deployed <strong>remotely</strong>, and cannot be used when the backend is deployed locally.</p><ul><li><code>Local</code> in this context refers to running both Raycast Unblock and Raycast simultaneously on the same computer.</li></ul></div><p>For users who use remote deployment, we recommend using <code>reverse proxy</code> to make Raycast Unblock service can be accessed normally.</p><p>This method requires you to <strong>deploy SSL certificate</strong> remotely, otherwise it will be invalid.</p><p>At the same time, <code>general.host</code> needs to be configured as <code>0.0.0.0</code> in the <code>config.toml</code> file.</p><p>You can modify your hosts file to make Raycast requests go to the backend built by this project.</p><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;Your Backend IP&gt; backend.raycast.com</span></span></code></pre></div><h3 id="generate-self-signed-certificate-to-use-with-raycast-unblock" tabindex="-1">Generate Self-signed Certificate to use with Raycast Unblock <a class="header-anchor" href="#generate-self-signed-certificate-to-use-with-raycast-unblock" aria-label="Permalink to &quot;Generate Self-signed Certificate to use with Raycast Unblock&quot;">​</a></h3><p>This section is written for those who want to use Raycast Unblock by specifying hosts. This may be useful for users deploying on NAS or other local machines.</p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>This is an advanced operation and it may require <em>some technical skills</em>. It is only suitable for production deployment in a remote server.</p></div><ol><li><p>Open your config file, set <code>enabled</code> to <code>true</code> in <code>[General.Https]</code>, fill in your host&#39;s local IP in <code>host</code>, and leave others as default. Then set <code>port</code> as <code>443</code> in <code>[General]</code>.</p></li><li><p>Then start Raycast Unblock, it will automatically setup HTTPS for the service and install the CA certificate.</p></li><li><p>Go to the CA Root certificate storage <em>(it will be shown in Raycast Unblock&#39;s log)</em>.</p></li><li><p>Export two files in it ( <code>rootCA-key.pem</code>, <code>rootCA.pem</code> ), and save these two files to <code>/Users/&lt;YOUR USERNAME&gt;/Library/Application Support/mkcert</code> (create it if not exists) in the computer that runs Raycast.</p></li><li><p>Go to <a href="https://github.com/FiloSottile/mkcert/releases/tag/v1.4.4" target="_blank" rel="noreferrer">FiloSottile/mkcert Release</a>, download and use the executable file that matches your Raycast computer&#39;s architecture, and rename it to <code>mkcert</code>.</p></li><li><p>Then run the following command after replacing the placeholders in the command:</p></li></ol><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">./mkcert</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -install</span></span></code></pre></div><p>When it shows <code>The local CA is now installed in the system trust store! ⚡️</code>, it means the installation is successful. You can use Raycast Unblock by specifying hosts now!</p>`,32),n=[i];function c(r,l,d,h,p,u){return a(),t("div",null,n)}const y=e(s,[["render",c]]);export{b as __pageData,y as default};
