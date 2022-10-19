<template>
  <section class="todo">
    <div class="todo__wrapper">
      <div class="todo__item">
        <h2 class="todo__title">To do list</h2>
        <button class="todo__button" @click="active = !active, this.$emit('!active')">
          <img src="../assets/Plus.svg" alt="">
        </button>
      </div>
      <div class="todo__item">
        <div class="todo__search">
          <button class="todo__search-btn">
            <img src="../assets/Search.svg" alt="" >
          </button>
          <input type="text" class="todo__search-input" placeholder="Поиск Имени, статуса или даты" v-model="query">
        </div>
        <div class="sort">
          <label class="sort__text">
            Сортировать по:
          </label>
          <div class="sort__to">
            <label class="sort__to-text"
            @click="choseActive = false,dataActive=true,statusActive=false,sortDateActive=true,sortStatusActive=false" 
            :class="{'choseActive-hover':choseActive,'dataUnactive':!dataActive,}">
              Дата
            </label>
            <label class="sort__to-text"
             @click="choseActive = false,statusActive=true,dataActive=false,sortDateActive=false,sortStatusActive=true" 
             :class="{
              'choseActive':choseActive,
              'choseActive-hover':choseActive,
              'statusActive':statusActive
              }">
              Статус
            </label>
          </div>
          <button class="sort__btn" @click="choseActive = !choseActive,choseActive?(dataActive=true) :statusActive ? (dataActive=false):''">
            <img class="sort__btn-img" src="../assets/Arrow.svg" alt="" :class="{'transform-chose':choseActive}">
          </button>
        </div>
      </div>
      <vTable
        :tasks=tasks
        :sortStatusActive=sortStatusActive
        :sortDateActive=sortDateActive
        :query=query
        @updateTasks="updateTasks"
      />
    </div>
    <vDialog
      :active=active
      @unactive="unactive"
      @updateTasks="updateTasks"
    />
  </section>
</template>

<script>
import vTable from '../components/vTable.vue'
import vDialog from '../components/vDialog.vue'

export default {
    components: { 
      vTable,
      vDialog
     },
     data(){
      return {
        active:false,
        choseActive:false,
        dataActive:true,
        statusActive:false,
        sortDateActive:true,
        sortStatusActive: false,
        query:'',
        tasks:[]
      }
     },
    setup() {
    },
    created() {
      this.getTasks()
    },
    methods:{
      taskNul(){
        this.tasksNul=true
        if(this.tasksNul){
          this.getTasks()
        }
      },
      getTasks(){
        if(localStorage.length!=0){
          for(let i=0 ;i< localStorage.length;i++){
            this.tasks.push(JSON.parse(localStorage.getItem(i)))
          }
        }
      },
      updateTasks(){
        this.tasks = []
        this.getTasks()
      },
      unactive(){
        this.active = !this.active
      },
    }
}
</script>

<style lang="scss">

.todo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &__wrapper {
    max-width: 1300px;
    width: 100%;
    padding: 100px 80px 40px;
    box-sizing: border-box;
    transition: 0.3s linear;
  }

  &__item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    padding-left: 40px;
  }

  &__title {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__button:hover {
    background: #e5e8f2;
  }
  &__button {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background: #D6DBEB;
    border: none;
    border-radius: 50%;
    transition:  0.2s linear;
  }

  &__search {
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  &__search-btn {
    background: none;
    border: none;
    cursor: pointer;
    margin-right: 16px;
  }

  &__search-input {
    border: none;
  }
  &__search-input:focus {
    outline: 0;
  }
  &__search-input::placeholder {
    color: #C4C4C4;
  }
}
.sort {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  &__text {
    margin-right: 15px;
  }

  &__to {
    display: flex;
    flex-direction: column;
    margin-right: 5px;
  }

  &__to-text {
    transition: 0.2s all linear;
    position: relative;
  }
  &__to-text:first-child {
    z-index: 3;
  }
  &__to-text:last-child {
    opacity: 0;
    transform: translateY(-19px);
  } 

  &__btn {
    cursor: pointer;
    background: none;
    border: none;
  }

  &__btn-img {
    transition: 0.2s all linear;
  }
}
.transform-chose{
  transform: rotate(180deg);
}
.choseActive-hover:hover{
  cursor: pointer;
  text-shadow: 0.2px 0.2px black; 
}
.choseActive{
  opacity: 1 !important;
  transform: translateY(0px) !important; 
}
.statusActive{
  opacity: 1 !important;
  transform: rotateY(-20px);
  z-index: 5;
}   
.dataUnactive{
  opacity: 0;
  transform: rotateY(20px);
}   
@media screen and (max-width:800px) {
  .todo{
    &__wrapper{
      padding: 80px 40px 30px;
    }
  }
}
@media screen and (max-width:700px) {
  .todo{
    &__wrapper{
      padding: 50px 20px 30px;
    }
    &__item{
      padding-left: 0px;
    }
    &__item:nth-child(2){
      flex-direction: column;
    }
    &__search{
      margin-bottom: 15px;
    }
  }
}
</style>