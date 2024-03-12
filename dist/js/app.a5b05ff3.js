(function(){"use strict";var t={1871:function(t,e,n){var o=n(5130),a=n(6768),s=n(4232);const i={id:"app"},l=(0,a.Lk)("h1",null,"To-Do List",-1),r=["placeholder"],d=(0,a.Lk)("button",{type:"submit",class:"action-btn"},"Add",-1),c={class:"filter-buttons"},u=["onUpdate:modelValue"],k={key:0},p={key:1},f=["onClick"],h=["onClick"],m=["onClick"],T=["onClick"];function b(t,e,n,b,v,g){return(0,a.uX)(),(0,a.CE)("div",i,[l,(0,a.Lk)("form",{onSubmit:e[1]||(e[1]=(0,o.D$)(((...t)=>g.addOrUpdateTodo&&g.addOrUpdateTodo(...t)),["prevent"]))},[(0,a.bo)((0,a.Lk)("textarea",{"onUpdate:modelValue":e[0]||(e[0]=t=>v.newTodo=t),placeholder:null===v.editingIndex?"Add a new task":"Edit task",class:"main-input"},null,8,r),[[o.Jo,v.newTodo]]),d],32),(0,a.Lk)("div",c,[(0,a.Lk)("button",{onClick:e[2]||(e[2]=t=>g.filterTasks("all")),class:"filter-btn"},"All"),(0,a.Lk)("button",{onClick:e[3]||(e[3]=t=>g.filterTasks("open")),class:"filter-btn"},"Open"),(0,a.Lk)("button",{onClick:e[4]||(e[4]=t=>g.filterTasks("completed")),class:"filter-btn"},"Completed"),(0,a.Lk)("button",{onClick:e[5]||(e[5]=(...t)=>g.clearAllTasks&&g.clearAllTasks(...t)),class:"action-btn clear-all-btn"},"Clear All")]),(0,a.bo)((0,a.Lk)("input",{"onUpdate:modelValue":e[6]||(e[6]=t=>v.searchQuery=t),placeholder:"Search tasks",class:"search-input"},null,512),[[o.Jo,v.searchQuery]]),(0,a.Lk)("ul",null,[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(g.filteredTasks,((t,e)=>((0,a.uX)(),(0,a.CE)("li",{key:t.id},[(0,a.Lk)("div",{class:(0,s.C4)([{completed:t.completed},"task-item"])},[(0,a.bo)((0,a.Lk)("input",{type:"checkbox","onUpdate:modelValue":e=>t.completed=e},null,8,u),[[o.lH,t.completed]]),t.completed?((0,a.uX)(),(0,a.CE)("span",p,(0,s.v_)(t.name)+" - Completed",1)):((0,a.uX)(),(0,a.CE)("span",k,(0,s.v_)(t.name),1)),(0,a.Lk)("span",null," - Created on "+(0,s.v_)(g.formatDateTime(t.createdAt)),1),(0,a.Lk)("button",{onClick:e=>g.deleteTask(t.id),class:"action-btn delete-btn"},"Delete",8,f),(0,a.Lk)("button",{onClick:t=>g.editTask(e),class:"action-btn edit-btn"},(0,s.v_)(v.editingIndex===e?"Cancel":"Edit"),9,h),v.editingIndex===e?((0,a.uX)(),(0,a.CE)("button",{key:2,onClick:t=>g.updateTask(e),class:"action-btn"},(0,s.v_)(null===v.editingIndex?"Add":"Update"),9,m)):(0,a.Q3)("",!0),t.completed||v.editingIndex===e?(0,a.Q3)("",!0):((0,a.uX)(),(0,a.CE)("button",{key:3,onClick:e=>g.markAsCompleted(t),class:"action-btn mark-btn"},"Mark Completed",8,T))],2)])))),128))])])}n(4114);var v=n(794),g={name:"App",data(){return{newTodo:"",tasks:[],editingIndex:null,filter:"all",searchQuery:""}},created(){this.fetchTasksFromLocalStorage()},computed:{filteredTasks(){let t=this.tasks;if("open"===this.filter?t=t.filter((t=>!t.completed)):"completed"===this.filter&&(t=t.filter((t=>t.completed))),this.searchQuery){const e=this.searchQuery.toLowerCase();t=t.filter((t=>t.name.toLowerCase().includes(e)))}return t}},methods:{addOrUpdateTodo(){null===this.editingIndex?this.addTask():this.updateTask()},addTask(){const{newTodo:t}=this;if(!t.trim())return;const e={id:(0,v.A)(),name:t,createdAt:new Date,completed:!1};this.tasks.push(e),this.newTodo="",this.saveTasksToLocalStorage()},updateTask(){const t=this.tasks[this.editingIndex];this.newTodo.trim()&&(t.name=this.newTodo,this.newTodo="",this.editingIndex=null,this.saveTasksToLocalStorage())},editTask(t){this.editingIndex===t?this.cancelEdit():(this.editingIndex=t,this.newTodo=this.tasks[t].name)},cancelEdit(){this.newTodo="",this.editingIndex=null},deleteTask(t){this.tasks=this.tasks.filter((e=>e.id!==t)),this.saveTasksToLocalStorage()},markAsCompleted(t){t.completed=!0,this.saveTasksToLocalStorage()},clearAllTasks(){this.tasks=[],this.saveTasksToLocalStorage()},formatDateTime(t){const e={year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"numeric"};return new Date(t).toLocaleString(void 0,e)},saveTasksToLocalStorage(){localStorage.setItem("tasks",JSON.stringify(this.tasks))},fetchTasksFromLocalStorage(){const t=localStorage.getItem("tasks");t&&(this.tasks=JSON.parse(t))},filterTasks(t){this.filter=t}}},C=n(1241);const L=(0,C.A)(g,[["render",b]]);var w=L;(0,o.Ef)(w).mount("#app")}},e={};function n(o){var a=e[o];if(void 0!==a)return a.exports;var s=e[o]={exports:{}};return t[o].call(s.exports,s,s.exports,n),s.exports}n.m=t,function(){var t=[];n.O=function(e,o,a,s){if(!o){var i=1/0;for(c=0;c<t.length;c++){o=t[c][0],a=t[c][1],s=t[c][2];for(var l=!0,r=0;r<o.length;r++)(!1&s||i>=s)&&Object.keys(n.O).every((function(t){return n.O[t](o[r])}))?o.splice(r--,1):(l=!1,s<i&&(i=s));if(l){t.splice(c--,1);var d=a();void 0!==d&&(e=d)}}return e}s=s||0;for(var c=t.length;c>0&&t[c-1][2]>s;c--)t[c]=t[c-1];t[c]=[o,a,s]}}(),function(){n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,{a:e}),e}}(),function(){n.d=function(t,e){for(var o in e)n.o(e,o)&&!n.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={524:0};n.O.j=function(e){return 0===t[e]};var e=function(e,o){var a,s,i=o[0],l=o[1],r=o[2],d=0;if(i.some((function(e){return 0!==t[e]}))){for(a in l)n.o(l,a)&&(n.m[a]=l[a]);if(r)var c=r(n)}for(e&&e(o);d<i.length;d++)s=i[d],n.o(t,s)&&t[s]&&t[s][0](),t[s]=0;return n.O(c)},o=self["webpackChunkvue_todo_list"]=self["webpackChunkvue_todo_list"]||[];o.forEach(e.bind(null,0)),o.push=e.bind(null,o.push.bind(o))}();var o=n.O(void 0,[504],(function(){return n(1871)}));o=n.O(o)})();
//# sourceMappingURL=app.a5b05ff3.js.map