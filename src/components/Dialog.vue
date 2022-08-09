<template>
  <div class="dialog">
    <el-dialog
      :title="dialog.title"
      v-model="dialog.show"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :append-to-body="true"
    >
      <div class="form">
        <el-form
          ref="form"
          :model="formData"
          :rules="form_rules"
          label-width="120px"
          style="margin: 10px; width: auto"
        >
          <el-form-item label="收支类型">
            <el-select v-model="formData.type" placeholder="收支类型">
              <el-option
                v-for="(formtype, index) in format_type"
                :key="index"
                :label="formtype"
                :value="formtype"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="describe" label="收支描述">
            <el-input type="describe" v-model="formData.describe"></el-input>
          </el-form-item>
          <el-form-item prop="income" label="收入：">
            <el-input type="income" v-model="formData.income"></el-input>
          </el-form-item>
          <el-form-item prop="expend" label="收出：">
            <el-input type="expend" v-model="formData.expend"></el-input>
          </el-form-item>
          <el-form-item prop="cash" label="账户现金：">
            <el-input type="cash" v-model="formData.cash"></el-input>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input type="textarea" v-model="formData.remark"></el-input>
          </el-form-item>
          <el-form-item class="text_right">
            <el-button @click="dialog.show = false">取消</el-button>
            <el-button type="primary" @click="onSubmit('form')">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "dialog",
    data() {
      return {
        format_type: [
          "提现",
          "提现手续费",
          "充值",
          "优惠劵",
          "充值礼券",
          "转账",
        ],
        form_rules: {
          describe: [
            {
              required: true,
              message: "收支描述不能为空！",
              trigger: "blur",
            },
          ],
          income: [
            {
              required: true,
              message: "收入不能为空！",
              trigger: "blur",
            },
          ],
          expend: [
            {
              required: true,
              message: "支出不能为空！",
              trigger: "blur",
            },
          ],
          cash: [
            {
              required: true,
              message: "账户现金不能为空！",
              trigger: "blur",
            },
          ],
        },
      };
    },
    props: {
      dialog: Object,
      formData: Object,
    },
    methods: {
      onSubmit(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            console.log(this.formData);
            const url=this.dialog.option=="add" ? "add" : `edit/${this.formData.id}`
            const text=this.dialog.option=="add"? '添加':'修改'
            // console.log(this.formData);
            this.$axios.post(`/api/profiles/${url}`, this.formData).then((res) => {
              //添加成功
              this.$message({
                message: `数据${text}成功`,
                type: "success",
              });

              // 隐藏dialog
              this.dialog.show = false;
              this.$emit("update");
            });
          }
        });
      },
    },
  };
</script>

<style></style>
