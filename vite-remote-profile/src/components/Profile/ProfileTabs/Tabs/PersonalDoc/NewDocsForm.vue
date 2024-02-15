<template lang="pug">
.new-doc 
  ValidationObserver(ref="observer" #default="{ validate }" tag="div")
    FormHeader(
      :show-actions="true"
      @to-all-documents="onToAllDocumentsClick"
      @cancel="onCancelButtonClick"
      @save="onSaveButtonClick(validate)"
    )
    h4.new-doc__title 
    .new-doc__select
      SMultiselect(
        v-model="selectedDocument"
        label="Тип документа"
        allow-empty
        track-by="type"
        item-label="name"
        close-on-select
        validation-mode="aggressive"
        :validation-rules='{"required":true}'
        :options='documents'
        :disabled="createdDocument !== INIT_DOCUMENT_VALUE"
    ) 
    .new-doc__create-btn(v-if="createdDocument === INIT_DOCUMENT_VALUE")
      SButton(
        variant="primary"
        size="small"
        type="button"
        @click="onCreateDocumentButtonClick"
      ) Создать

    template(v-if="createdDocument !== INIT_DOCUMENT_VALUE")
      DocumentFieldset(
        :document="createdDocument"
        :doc-vid="createdDocument.id || createdDocument.tmpId"
        :fieldset="fieldset[createdDocument.type]"
        @update="updateDocument({ id: createdDocument.id || createdDocument.tmpId, payload: $event })"
        @delete-attach="deleteAttach"
      )
    
</template>

<script>
import { set } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { mapState } from 'vuex'
import { ValidationObserver } from 'vee-validate'
import { SMultiselect, SButton } from '@synergy/lms-ui-kit'

import FormHeader from './FormHeader.vue'
import DocumentFieldset from '~/components/Common/DocumentFieldset.vue'

import { DOCUMENTS_TEMPLATE_BY_TYPE } from '~/consts/profile-documents-consts'
import { mapErrorsWithVID } from '~/helpers/documents-helper'

const INIT_DOCUMENT_VALUE = null

export default {
  name: 'NewDocsForm',

  components: { SMultiselect, SButton, FormHeader, ValidationObserver, DocumentFieldset },

  inject: ['displayConfirmRedirectModal'],

  props: {
    type: {
      type: String,
      default: 'default',
      validator: (value) => ['default', 'personal', 'education'].includes(value),
    },
    fieldset: { type: Object, default: () => ({}) },
  },

  data: () => ({
    INIT_DOCUMENT_VALUE,

    selectedDocument: INIT_DOCUMENT_VALUE,
    createdDocument: null,
    documents: [],
  }),

  computed: {
    ...mapState({
      allDocuments: (state) => state.profile.documents,
    }),
  },

  methods: {
    getDocumentsList() {
      const documents = []

      for (const [type, value] of Object.entries(DOCUMENTS_TEMPLATE_BY_TYPE)) {
        if (this.type === 'default') {
          if (value.category !== 'identity') continue
        }
        if (this.type === 'personal') {
          if (value.category !== 'other_identity') continue
        }
        if (this.type === 'education') {
          if (value.category !== 'education') continue
        }
        documents.push({ type, ...value })
      }

      return documents
    },

    onToAllDocumentsClick() {
      const isFormChanged = this.selectedDocument !== INIT_DOCUMENT_VALUE

      if (isFormChanged) {
        this.displayConfirmRedirectModal(() => {
          this.$emit('to-all-documents')
        })
      } else {
        this.$emit('to-all-documents')
      }
    },
    async deleteAttach({ attachmentId, documentId }) {
      await this.$store.dispatch('documents/deleteAttachment', { attachmentId, documentId })
    },
    updateDocument({ payload }) {
      const { fieldMeta, value } = payload

      if (fieldMeta.type !== 'image') {
        set(this.createdDocument, fieldMeta.field, value)
        return
      }

      if (fieldMeta.type === 'image') {
        const normalizedValue = value[0] || {}

        normalizedValue.fieldType = fieldMeta.field

        if (!this.createdDocument.attachments) {
          set(this.createdDocument, 'attachments', [])
        }

        if (!value.length) {
          const attachIdx = this.createdDocument.attachments.findIndex((attach) =>
            [attach.type, attach.fieldType].includes(fieldMeta.field),
          )
          this.createdDocument.attachments.splice(attachIdx, 1)
          return
        }
        this.createdDocument.attachments.push(normalizedValue)
      }
    },
    onCreateDocumentButtonClick() {
      const { type, name } = this.selectedDocument

      this.createdDocument = {
        type,
        name,
        category: DOCUMENTS_TEMPLATE_BY_TYPE[type].category,
        tmpId: uuidv4(),
      }
    },
    onCancelButtonClick() {
      this.selectedDocument = INIT_DOCUMENT_VALUE
      this.createdDocument = null
    },
    async onSaveButtonClick(validate) {
      const isValidStep = true || (await validate())

      if (!isValidStep) {
        this.$scrollTo('.invalid', { offset: -20, container: '.form__fieldset' })
        return
      }

      this.$wait.start('submit')

      const doc = this.createdDocument

      try {
        const result = await this.$store.dispatch('documents/saveDocument', doc)

        if (doc.tmpId) {
          this.$store.commit('profile/createDocumentWithTmpId', doc)
          this.$store.commit('profile/updateDocumentWithTmpId', {
            tmpId: doc.tmpId,
            apiDoc: result,
          })
        }

        this.$refs.observer.reset()

        this.$emit('to-all-documents', this.createdDocument)
      } catch (e) {
        if (e?.formErrors) {
          this.$refs.observer.setErrors(mapErrorsWithVID(e?.formErrors, doc.id || doc.tmpId))
        }

        this.$nextTick(() => {
          this.$scrollTo('.invalid', { offset: -20, container: '.form__fieldset' })
        })

        this.$toast.warning(`Документ не сохранен. Ошибка: ${e.code || e.message}`)
      }

      this.$wait.end('submit')
    },
  },

  created() {
    this.documents = this.getDocumentsList()
  },
}
</script>

<style lang="scss" scoped>
.new-doc {
  &__title {
    font-family: Rubik;
    font-size: 22px;
    font-weight: 500;
    line-height: 30px;
    letter-spacing: 0em;
    text-align: left;

    color: #0d1140;

    margin-top: 16px;
    margin-bottom: 24px;

    display: flex;
    justify-content: space-between;

    & svg {
      cursor: pointer;
    }
  }
  &__create-btn {
    display: flex;
    justify-content: end;
  }
  &__add-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    & span {
      margin-left: 8px;
    }
  }
}
</style>
