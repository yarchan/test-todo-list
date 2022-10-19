<template>
  <Transition name="bounce">
    <div class="dialog" v-if="active" >
      <div class="dialog__wrapper">
        <div class="dialog__top">
          <h3 class="dialog__title">
            Создать новую задачу
          </h3>
          <button class="dialog__btn-close" @click="unactive">
            <img src="../assets/Close.svg" alt="" class="dialog__btn-close-content">
          </button>
        </div>
        <div class="dialog__input">
          <label for="" class="dialog__input-field"> Описание </label>
          <input v-on:keyup.enter="createTodo" type="text" class="dialog__input-enter" placeholder="Введите описание" v-model="task.value">
        </div>
        <div class="dialog__btn-create-wrapper">
          <button class="dialog__btn-create" @click="createTodo">
            Создать 
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  props:{
    active: Boolean
  },
  data(){
    return{
      data:{},
      task:{
        taskKey:0,
        value:'',
        isDone:false,
        dataTime:'',
      }
    }
  },  
  methods:{
    unactive(){
      this.$emit('unactive')
    },
    updateTasks(){
      this.$emit('updateTasks')
    },
    convertMonth(data){
      const month = data.getMonth()+1
      if(month<10){
        return `0${month}`
      }else {
        return `${month}`
      }
    },
    createTodo(){
      if(localStorage.length==0){
        this.task.taskKey=0
      }
      if(localStorage.length!=0){
        this.task.taskKey = localStorage.length
      }
      this.data = new Date()
      this.task.dataTime = `${this.data.getDate()}.${this.convertMonth(this.data)}.${this.data.getFullYear()}`
      localStorage.setItem(this.task.taskKey.toString(),JSON.stringify(this.task))
      this.unactive()
      this.updateTasks()
      this.task.value=''
    },
  }
}
</script>

<style lang="scss"> 
.active{
  display: none !important;
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}
.dialog {
  width: 100%;
  background: rgba(255, 255, 255, 0.01);
  backdrop-filter: blur(2px);
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  &__wrapper {
    padding: 40px 40px 50px;
    background: #FFFFFF;
    border: 1px solid #DDE2E4;
    box-shadow: 0px 25px 50px -12px rgba(0, 0, 0, 0.25);
    border-radius: 6px;
  }

  &__top {
    display: flex;
    margin-bottom: 32px;
  }

  &__title {
    margin-right: 62px;
  }

  &__btn-close {
    padding: 8px;
    display: flex;
    background: #314B99;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.2s all linear;
    max-height: 22px;
  }

  &__btn-close:hover{
    background: #5f79c8;
  }
  &__btn-close-content {
    color: white;
  } 

  &__input {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
    -webkit-appearance: none;
  }

  &__input-field {
    margin-bottom: 5px;
  }

  &__input-enter:focus {
    background: #F0F5FF;
  }
  &__input-enter:hover {
    background: #F0F5FF;
  }
  &__input-enter::placeholder {
    opacity: 0.5;
  }
  &__input-enter {
    outline:none;
    outline-offset: 0;
    border: 1px solid #DDE2E4;
    transition: 0.2s all linear;
    padding: 11px 16px;
    border-radius: 8px;
  }
  &__btn-create-wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__btn-create {
    border: none;
    padding: 12px 40px;
    background: #F0F5FF;
    border-radius: 8px;
    font-size: 14px;
    color: #314B99;
    cursor: pointer;
    -webkit-transition: 0.2s all linear;

  }
  &__btn-create:hover {
    background:#d8e3f9;
  }
}
@media screen and (max-width:380px) {
  .dialog{
    &__wrapper{
    padding: 20px ;
  }
  }
}

</style>
