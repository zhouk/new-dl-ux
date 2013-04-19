var contentTemplate = 
  '<div class="pg_banner"><img src="<%= json.banner.src %>" alt="<%= json.banner.alt %>" /></div> ' 
+ '<div class="bar_helpme"> ' 
+ '    <a class="icon_help" href="<%= json.helpme.href %>" title="<%= json.helpme.title %>"><span><%= json.helpme.text %></span></a> ' 
+ '</div> ' 
+ '<div class="rec_box"> ' 
+ '    <ol class="tabs fix"> ' 
+ '        <% for(var i=0,len=json.tabnav.length;i<len;i++){ %> ' 
+ '            <% var cur = i==0 ? "class=on" : "",nav=json.tabnav[i]; %> ' 
+ '            <li <%= cur %> style="<%= nav.style %>"><%= nav.text %></li> ' 
+ '        <% } %> ' 
+ '    </ol> ' 
+ '    <% for(var i=0,len=json.tabcon.length;i<len;i++){ %> ' 
+ '    <% var cur = i==0 ? "style=display:block;" : "",con=json.tabcon[i]; %> ' 
+ '    <% var isAll=!!con.all; %> ' 
+ '        <% if(!isAll){ %> ' 
+ '            <ul class="onepage fix" <%= cur %>> ' 
+ '                <% for(var j=0,n=con.length;j<n;j++){ %> ' 
+ '                <% var item=con[j]; %> ' 
+ '                <li class="item"> ' 
+ '                    <a class="pic" href="<%= item.img.href %>"><img src="<%= item.img.src %>" alt="<%= item.img.alt %>" /><span class="t"><%= item.img.text %></span></a> ' 
+ '                    <a class="dnload" href="<%= item.download.href %>"><%= item.download.text %></a> ' 
+ '                    <p class="related">More products for<br /><a href="<%= item.related.href %>"><%= item.related.text %></a></p> ' 
+ '                </li> ' 
+ '                <% } %> ' 
+ '            </ul> ' 
+ '        <% }else{ %> ' 
+ '            <div class="onepage all_products fix"  <%= cur %>> ' 
+ '                <% for(var z in con.all){ %> ' 
+ '                <% var col=con.all[z],items=col.items %> ' 
+ '                <div class="col lf"> ' 
+ '                    <h3><%= col.title %></h3> ' 
+ '                    <% for(var x in items){ %> ' 
+ '                        <% var item=items[x],links=item.links; %> ' 
+ '                        <% if(item.title){ %> ' 
+ '                        <h4><%= item.title %></h4> ' 
+ '                        <% } %> ' 
+ '                        <ul class="list"> ' 
+ '                            <% for(var y in links){ %> ' 
+ '                            <li><a href="<%= links[y].href %>"><%= links[y].text %></a></li> ' 
+ '                            <% } %> ' 
+ '                        </ul> ' 
+ '                    <% } %> ' 
+ '                </div> ' 
+ '                <% } %> ' 
+ '            </div> ' 
+ '        <% } %> ' 
+ '    <% } %> ' 
+ '</div> ' 
+ '<% var dtbox=json.detailbox; %> ' 
+ '<% for(var i in dtbox){ %> ' 
+ '<% var box=dtbox[i]; %> ' 
+ '<div id="<%= box.id %>" class="detailbox fix"> ' 
+ '    <div class="main lf"> ' 
+ '        <h2 class="title"><%= box.title %></h2> ' 
+ '        <div class="brief fix"> ' 
+ '            <a class="pic" href="<%= box.img.href %>"><img src="<%= box.img.src %>" alt="<%= box.img.alt %>" /></a> ' 
+ '            <div class="descrip"> ' 
+ '                <p><%= box.description %></p> ' 
+ '            </div> ' 
+ '            <ul class="links fix"> ' 
+ '                <% for(var j in box.about){ %> ' 
+ '                    <% var link=box.about[j]; %> ' 
+ '                    <li><a href="<%= link.href %>"><%= link.text %></a></li> ' 
+ '                <% } %> ' 
+ '            </ul> ' 
+ '        </div> ' 
+ '        <div class="tool fix"> ' 
+ '            <div class="like lf"> ' 
+ '                <iframe scrolling="no" style="border: none; overflow: hidden; height: 24px; width: 200px;" title="Like this content on Facebook." src="<%= box.like %>"></iframe> ' 
+ '            </div> ' 
+ '            <% if(box.share){ %> ' 
+ '            <div class="share rf"> ' 
+ '                <a class="email" href="<%= box.share.email %>"></a> ' 
+ '                <a class="f" href="<%= box.share.f %>" target="_blank"></a> ' 
+ '                <a class="t" href="<%= box.share.t %>" target="_blank"></a> ' 
+ '                <a class="in" href="<%= box.share.in %>" target="_blank"></a> ' 
+ '                <a class="g" href="<%= box.share.g %>" target="_blank"></a> ' 
+ '            </div> ' 
+ '            <% } %> ' 
+ '        </div> ' 
+ '        <div class="dnloadbox"> ' 
+ '            <h5 class="t">DOWNLOAD</h5> ' 
+ '            <table border="0" width="100%" cellpadding="0" cellspacing="0"> ' 
+ '                <thead> ' 
+ '                    <% for(var k in box.download.thead){ %> ' 
+ '                    <th><%= box.download.thead[k] %></th> ' 
+ '                    <% } %> ' 
+ '                </thead> ' 
+ '                <tbody> ' 
+ '                    <% for(var k in box.download.tbody){ %> ' 
+ '                        <% var row=box.download.tbody[k],cls=!(k%2)?"class=even":""; %> ' 
+ '                        <tr <%= cls %>> ' 
+ '                            <% for(var m in row){ %> ' 
+ '                            <td><%= row[m] %></td> ' 
+ '                            <% } %> ' 
+ '                        </tr> ' 
+ '                    <% } %> ' 
+ '                </tbody> ' 
+ '            </table> ' 
+ '        </div> ' 
+ '        <div class="boxbtm fix"> ' 
+ '            <a class="other lf" href="<%= box.download.other.href %>"><%= box.download.other.text %></a> ' 
+ '            <a class="gotop rf" href="javascript:scroll(0,0);">goto top</a> ' 
+ '        </div> ' 
+ '    </div> ' 
+ '    <div class="sider lf"> ' 
+ '        <h3 class="title"><%= box.sider.title %></h3> ' 
+ '        <h4 class="sub"><%= box.sider.sub %></h4> ' 
+ '        <div class="des"> ' 
+ '            <% for(var i in box.sider.info){ %> ' 
+ '            <p><%= box.sider.info[i] %></p> ' 
+ '            <% } %> ' 
+ '        </div> ' 
+ '    </div> ' 
+ '</div> ' 
+ '<% } %> ' 