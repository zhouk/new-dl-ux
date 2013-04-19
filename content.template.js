template.compile('contentTemplate', '\
	<div class="pg_banner"><h1>Free Design Software for Students and Educators</h1></div> \
	<div class="bar_helpme"> \
	    <a class="icon_help" href="#" title="#"><span>Help Me Choose</span></a> \
	</div> \
	\
	<div class="rec_box"> \
	\
	    <ol class="tabs fix"> \
	        <% for(i=0; i<tabs.length; i++) { %>\
	        	<li id="<%= tabs[i].id %>" class="<%= i==0?\'on\':\'\' %>" style="width:<%= tabs[i].width %>"><%= tabs[i].name %></li>\
	        <% } %>\
	    </ol> \
	    \
	    <% for(i=0; i<tabs.length; i++) { %>\
	    \
	    	<% if(tabs[i].products) { %>\
		        <ul class="onepage fix" style="display:<%= i==0?\'block\':\'none\' %>"> \
					<% for(j=0; j<tabs[i].products.length; j++) { %>\
						<% var p=tabs[i].products[j], product = $getProduct(p.id, products) %>\
						<% if(product != null) { %>\
		            	<li class="item">\
			                <a class="pic" href="<%= \'#\' + tabs[i].id + \'-\' + p.id %>"><img src="<%= product.image %>" alt="<%= product.name %>" /><span class="t <%= product.name.length > 20 ? \'s\':\'\' %>"><%= product.name %></span></a> \
			                <a class="dnload" href="<%= \'#\' + tabs[i].id + \'-\' + p.id %>">DOWNLOAD</a> \
			            	<% if(i==0) { %> \
			                	<p class="related">More products for<br /><a href="<%= tabs[i].products[j].relatedUrl %>"><%= tabs[i].products[j].relatedCategory %></a></p> \
			                <% } %> \
		            	</li>\
		            	<% } else { %>\
		            		<li><%= p.id %></li>\
		            	<% } %>\
		            <% } %>\
		        </ul> \
	        <% } else { %>\
	        	<% var allProducts = tabs[i].allProducts %>\
	            <div class="onepage all_products fix" display="none"> \
	            	<div class="col lf">\
	            		<h3>By Design Purpose</h3>\
	            		<% for(var c in allProducts.categories) { %>\
	            			<h4><%= allProducts.categories[c].name %></h4>\
	            			<ul class="list">\
	            			<% for(var key in allProducts.categories[c].productIDs) { %>\
	            				<% var product = $getProduct(allProducts.categories[c].productIDs[key], allProducts.products) %>\
	            				<li><a href="<%= product.url %>"><%= product.text %></a></li>\
	            			<% } %>\
	            			</ul>\
	            		<% } %>\
	            	</div>\
	            	\
	            	<div class="col lf">\
	            		<h3>Alphabetic Order</h3>\
	            		<ul class="list">\
	            			<% var sorted = allProducts.products.sort(function(a,b){ return a.text > b.text ? 1:-1; }) %>\
	            			<% for(var p in sorted) { %>\
	            			<li><a href="<%= sorted[p].url %>"><%= sorted[p].text %></a></li>\
	            			<% } %>\
	            		</ul>\
	            	</div>\
	            \
	            </div> \
	        \
	        <% } %>\
	        \
	    <% } %>\
        \
	</div> \
	\
	\
	\
	\
	<% for(i=0; i<tabs.length-1; i++) { %>\
		<div class="groupbox">\
			<% for(j=0; j<tabs[i].products.length; j++) { %>\
				<% var product = $getProduct(tabs[i].products[j].id, products) %>\
				<% if(product == null) continue; %>\
				<div id="<%= tabs[i].id + \'-\' + tabs[i].products[j].id %>" class="detailbox fix">\
				\
			        <div class="main lf"> \
			        \
		            	<h2 class="title"><%= product.name %></h2>\
			            \
			            <div class="brief fix"> \
			                <a class="pic"><img src="<%= product.image %>" alt="<%= product.name %>" /></a> \
			                <div class="descrip"> \
			                    <p><%= product.description %></p> \
			                </div> \
			                <ul class="links fix"> \
			                    <% for(var info in product.productLinks){ %> \
			                        <% var link=product.productLinks[info]; %> \
			                        <li><a href="<%= link.url %>"><%= link.text %></a></li> \
			                    <% } %> \
			                </ul> \
			            </div> \
			            \
			            <div class="tool fix"> \
			                <div class="like lf"> \
			                    <div class="fb-like" data-href="http://students.autodesk.com/?nd=download#<%=tabs[i].id + \'-\' + tabs[i].products[j].id%>" data-send="false" data-width="450" data-show-faces="false" data-font="segoe ui"></div>\
			                </div> \
				        </div>\
				        \
			            <div class="dnloadbox"> \
			                <h5 class="t">DOWNLOAD</h5> \
			                <table border="0" width="100%" cellpadding="0" cellspacing="0"> \
			                \
			                    <thead> 		                    \
			                        <th>Language</th>\
			                        <th>Platform</th>\
			                        <% var numOfReleases =product.downloadLinks[0].releases.length %>\
			                        <% for(k=0; k<numOfReleases; k++) { %>\
			                        <th><%= product.downloadLinks[0].releases[k].release %></th>\
			                        <% } %>\
			                    </thead> \
			                    \
			                    <tbody> \
			                        <% for(k=0; k<product.downloadLinks.length; k++) { %> \
			                        	<% var row = product.downloadLinks[k] %>\
			                            <tr class="<%= (k%2)?\'\':\'even\' %>"> \
			                            \
			                            	<td><%= row.language %></td>\
			                            	<td><%= row.platform %></td>\
			                            	\
			                                <% for(l=0; l<numOfReleases; l++) { %> \
			                                	<% if(row.releases[l] != null) { %>\
			                                		<td>\
			                                			<% for(var index in row.releases[l].files) { %>\
			                                				<a class="login" href="<%= row.releases[l].files[index].url %>"><%= row.releases[l].files[index].text %></a>\
			                                			<% } %>\
			                                		</td> 	\
			                                	<% } else { %>\
			                                		<td>&nbsp;</td>\
			                                	<% } %>\
			                                <% } %> \
			                                \
			                            </tr>  \
			                        <% } %> \
			                    </tbody> \
			                    \
			                </table> \
			            </div> \
			            \
			            <div class="boxbtm fix"> \
			                <a class="other lf" href="<%= product.othersUrl %>">Other languages &amp; versions</a> \
			                <a class="gotop rf" href="javascript:scroll(0,0);">goto top</a> \
		 		        </div> \
			        \
				    </div>\
				    \
			        <div class="sider lf"> \
			            <h3 class="title">Resources</h3> \
			            \
			            <% for(m=0; m<product.resources.length; m++) { %>\
			            <h4 class="sub"><%= product.resources[m].heading %></h4> \
			            <div class="des"> \
			                <% for(var n in product.resources[m].links){ %> \
			                	<p><a href="<%= product.resources[m].links[n].url %>"><%= product.resources[m].links[n].text %></a></p> \
			                <% } %> \
			            </div> \
			            <% } %>\
			        </div> \
				    \
				</div>\
			<% } %>\
		</div>\
	<% } %>\
	\
	\
');