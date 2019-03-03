(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{17:function(e,a,t){e.exports=t(49)},23:function(e,a,t){},24:function(e,a,t){},25:function(e,a,t){},45:function(e,a,t){},46:function(e,a,t){},47:function(e,a,t){},48:function(e,a,t){},49:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),l=t(10),i=t.n(l),s=(t(23),t(11)),c=t(12),o=t(13),m=t(15),u=t(14),p=t(16),d=(t(24),t(25),t(3)),h=t.n(d),f=(t(45),t(46),function(e){return r.a.createElement("div",{key:e.id,className:"formContainer"},r.a.createElement("form",{action:"submit",onSubmit:e.handleSubmit},r.a.createElement("input",{type:"text",placeholder:"Recipe/Ingredient search",onChange:e.handleChange,name:"userInput",value:e.userInputValue}),r.a.createElement("label",{htmlFor:"meal"},"Filter by meal?"),r.a.createElement("select",{name:"meal",value:e.mealValue,onChange:e.handleChange},r.a.createElement("optgroup",{label:"Pick a Meal"},r.a.createElement("option",{value:""},"All Meals"),r.a.createElement("option",{value:"Breakfast and Brunch"},"Breakfast"),r.a.createElement("option",{value:"Lunch"},"Lunch"),r.a.createElement("option",{value:"Main Dishes"},"Dinner"),r.a.createElement("option",{value:"Desserts"},"Desserts"))),r.a.createElement("label",{htmlFor:"time"},"Filter by Cook/Prep Time?"),r.a.createElement("select",{name:"time",value:e.timeValue,onChange:e.handleChange},r.a.createElement("optgroup",{label:"Pick a cook/prep time"},r.a.createElement("option",{value:""},"Any Amount of time"),r.a.createElement("option",{value:"1800"},"Half Hour or Less"),r.a.createElement("option",{value:"3600"},"One Hour or Less"))),r.a.createElement("button",{type:"submit"},"Find Recipes")))}),E=function(e){return r.a.createElement("header",{className:"header"},r.a.createElement("div",{className:"wrapper"},r.a.createElement("div",{className:"headingContainer"},r.a.createElement("h1",null,"Food App"))),r.a.createElement("div",{className:"bannerContainer"},r.a.createElement("div",{className:"wrapper"},r.a.createElement("div",{className:"subheadingContainer"},r.a.createElement("h2",null,"The Keto ",r.a.createElement("span",null,"Recipe Finder"))),r.a.createElement(f,{handleSubmit:e.handleSubmit,handleChange:e.handleChange,mealValue:e.meal,timeValue:e.time,userInputValue:e.userInput}))))},g=(t(47),function(e){return r.a.createElement("div",{key:e.id,className:"cardContainer"},r.a.createElement("div",{className:"cardTextContainer"},r.a.createElement("h2",null,e.name)),r.a.createElement("figure",{className:"cardImageContainer"},r.a.createElement("img",{className:"cardImage",src:e.image,alt:e.name}),r.a.createElement("figcaption",{className:"cardCaption"},r.a.createElement("p",null,"Total Cook/Prep Time: ",e.time/60," minutes"),r.a.createElement("a",{href:e.url,target:"_blank"},e.name)," ","information powered by"," ",r.a.createElement("img",{alt:"Yummly",src:"https://static.yummly.co/api-logo.png"}))))}),v=(t(48),function(){return r.a.createElement("footer",{className:"footer"},r.a.createElement("div",{className:"wrapper"},r.a.createElement("p",{className:"copyright"},"\xa9 2019 ",r.a.createElement("span",null,"Brian Armitage")," Incorporated")))}),b=function(e){function a(){var e;return Object(c.a)(this,a),(e=Object(m.a)(this,Object(u.a)(a).call(this))).handleChange=function(a){e.setState(Object(s.a)({},a.target.name,a.target.value))},e.handleSubmit=function(a){a.preventDefault(),e.setState({isLoading:!0}),e.getRecipes(e.state.userInput,e.state.meal,e.state.time)},e.getRecipes=function(a,t,n){h()({method:"GET",url:"https://api.yummly.com/v1/api/recipes",dataResponse:"json",params:{_app_key:"aaf99c9fd90f66999849bafbff2e01ff",_app_id:"ff2d06e9",format:"json",q:"keto "+a,maxResult:10,requirePictures:!0,maxTotalTimeInSeconds:n,allowedCourse:"course^course-"+t}}).then(function(a){if(0===(a=a.data.matches).length)e.setState({hasNoResults:!0,isLoading:!1,recipes:[]});else{var t=a.map(function(e){return e.id}).map(function(a){return e.getRecipeDetails(a)});Promise.all(t).then(function(t){t.map(function(e){return[e.data]}).forEach(function(e,t){a[t].recipeApiResults=e}),e.setState({hasNoResults:!1,recipes:a,isLoading:!1})})}})},e.getRecipeDetails=function(e){return h()({method:"GET",url:"https://api.yummly.com/v1/api/recipe/"+e,dataResponse:"json",params:{_app_key:"aaf99c9fd90f66999849bafbff2e01ff",_app_id:"ff2d06e9",format:"json"}})},e.state={recipes:[],userInput:"",meal:"",time:"",isLoading:"",hasNoResults:""},e}return Object(p.a)(a,e),Object(o.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement(E,{handleSubmit:this.handleSubmit,handleChange:this.handleChange,mealValue:this.state.meal,timeValue:this.state.time,userInputValue:this.state.userInput}),r.a.createElement("main",{id:"main"},r.a.createElement("section",{className:"results"},r.a.createElement("div",{className:"wrapper"},this.state.isLoading?r.a.createElement("p",{className:"loading animated heartBeat"},"Loading..."):this.state.recipes.map(function(e){return r.a.createElement(g,{key:e.id,name:e.recipeName,image:e.recipeApiResults[0].images[0].hostedLargeUrl,time:e.totalTimeInSeconds,url:e.recipeApiResults[0].attribution.url})}),this.state.hasNoResults&&r.a.createElement("p",{className:"error"},"Sorry there were no results. Please search again!")))),r.a.createElement(v,null))}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(b,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[17,1,2]]]);
//# sourceMappingURL=main.7c893e1f.chunk.js.map