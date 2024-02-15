<template lang="pug">
.new-doc 
  ValidationObserver(ref="observer" #default="{ validate }" tag="div")
    FormHeader(@to-all-documents="onToAllDocumentsClick")
    template(v-if="!changeMode")
      h4.new-doc__title 
        span {{DOCUMENTS_TITLE_BY_TYPE[type].add}}
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
          :options="documents"
          :disabled="document !== INIT_DOCUMENT_VALUE"
      ) 
      .new-doc__create-btn(v-if="document === INIT_DOCUMENT_VALUE")
        SButton(
          variant="primary"
          size="small"
          type="button"
          @click="onCreateDocumentButtonClick"
        ) Создать
    template(v-if="changeMode || document !== INIT_DOCUMENT_VALUE")
      .chips-row(v-if="document?.actual_state || document?.state")
        Chips(
          v-if="document?.actual_state"
          :type="ACTUAL_STATE_CHIPS[document.actual_state]?.type" 
          :icon="ACTUAL_STATE_CHIPS[document.actual_state]?.icon"  
        ) 
          span {{ACTUAL_STATE_CHIPS[document.actual_state]?.label}}
        Chips(
          v-if="document.state"
          :type="STATE_CHIPS[document.state]?.type" 
          :icon="STATE_CHIPS[document.state]?.icon"  
        ) 
          span {{STATE_CHIPS[document.state]?.label}}
      DocumentFieldset(
        v-bind="inputFieldAttrsByState"
        :document="document"
        :doc-vid="document.id || document.tmpId"
        :fieldset="fieldset[document.type]"
        @update="updateDocument({ id: document.id || document.tmpId, payload: $event })"
        @delete-attach="deleteAttach"
      )
      .actions
        template(v-if="mode === MODE.READONLY")
          SButton.edit-button(
            variant="primary" 
            size="medium" 
            type="button"
            @click="onEditButtonClick"
          )
            span Редактировать
        template(v-else)
          SButton(
            variant="secondary" 
            size="medium" 
            type="button"
            @click="onCancelButtonClick"
          )
            span Отменить
          SButton(
            variant="primary" 
            size="medium" 
            type="button"
            class="ml-2"
            @click="onSaveButtonClick(validate)"
          )
            span Сохранить
</template>

<script>
import { set } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { mapState } from 'vuex'
import { ValidationObserver } from 'vee-validate'
import { SMultiselect, SButton } from '@synergy/lms-ui-kit'

import Chips from '~/components/ui/Chips/Chips.vue'
import FormHeader from './FormHeader.vue'
import DocumentFieldset from '~/components/Common/DocumentFieldset.vue'

import {
  DOCUMENTS_TEMPLATE_BY_TYPE,
  MODE,
  ATTRS_BY_MODE,
  DOCUMENTS_TITLE_BY_TYPE,
} from '~/consts/profile-documents-consts'
import { mapErrorsWithVID } from '~/helpers/documents-helper'

const INIT_DOCUMENT_VALUE = null

const ACTUAL_STATE_CHIPS = {
  actual: { label: 'Актуальный', type: 'success', icon: true },
  closed: { label: 'Потерял силу', type: 'warning', icon: true },
  overdue: { label: 'Кончился срок действия', type: 'error', icon: true },
}
const STATE_CHIPS = {
  draft: { label: 'Недозаполненный документ', type: 'default', icon: true },
  raw: { label: 'Не прошел проверку', type: 'error', icon: true },
  verified: { label: 'Проверенный', type: 'success', icon: true },
  declined: { label: 'Отклоненный', type: 'error', icon: true },
}

export default {
  name: 'NewDocsForm',

  components: { SMultiselect, SButton, FormHeader, ValidationObserver, DocumentFieldset, Chips },

  inject: ['displayConfirmRedirectModal'],

  props: {
    changeMode: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'default',
      validator: (value) => ['default', 'personal', 'education'].includes(value),
    },
    doc: {
      type: Object,
      default: () => ({}),
    },
    fieldset: { type: Object, default: () => ({}) },
  },

  data: () => ({
    ACTUAL_STATE_CHIPS,
    STATE_CHIPS,
    INIT_DOCUMENT_VALUE,
    ATTRS_BY_MODE,
    DOCUMENTS_TITLE_BY_TYPE,
    MODE,

    mode: MODE.READONLY,
    selectedDocument: INIT_DOCUMENT_VALUE,
    document: null,
    documents: [],
  }),

  computed: {
    ...mapState({
      allDocuments: (state) => state.profile.documents,
    }),
    inputFieldAttrsByState() {
      return this.ATTRS_BY_MODE[this.mode] || {}
    },
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
      const isFormChanged = this.mode === MODE.CHANGE || this.selectedDocument !== INIT_DOCUMENT_VALUE

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
        set(this.document, fieldMeta.field, value)
        return
      }

      if (fieldMeta.type === 'image') {
        const normalizedValue = value[0] || {}

        normalizedValue.fieldType = fieldMeta.field

        if (!this.document.attachments) {
          set(this.document, 'attachments', [])
        }

        if (!value.length) {
          this.document.attachments = this.document.attachments.filter(
            (attach) => ![attach.type, attach.fieldType].includes(fieldMeta.field),
          )
          return
        }
        this.document.attachments = [...this.document.attachments, normalizedValue]
      }
    },
    onCreateDocumentButtonClick() {
      if (this.selectedDocument === INIT_DOCUMENT_VALUE) {
        return
      }

      this.createDocument(this.selectedDocument)
    },
    createDocument(doc = {}) {
      const { type, name } = doc

      this.document = {
        type,
        name,
        category: DOCUMENTS_TEMPLATE_BY_TYPE[type].category,
        tmpId: uuidv4(),
      }

      this.mode = MODE.CHANGE
    },
    onEditButtonClick() {
      this.mode = MODE.CHANGE
    },
    onCancelButtonClick() {
      if (this.changeMode) {
        if (!this.doc.id && !this.doc.tmpId) {
          this.createDocument(this.doc)
        } else {
          this.document = { ...this.doc }
          this.mode = MODE.READONLY
        }
      } else {
        this.selectedDocument = INIT_DOCUMENT_VALUE
        this.document = null
        this.mode = MODE.READONLY
      }
    },
    async onSaveButtonClick(validate) {
      const isValidStep = await validate()

      if (!isValidStep) {
        this.$scrollTo('.invalid', { offset: -20, container: '.form__fieldset' })
        return
      }

      this.$wait.start('submit')

      const doc = this.document

      try {
        const result = await this.$store.dispatch('documents/saveDocument', doc)

        if (!this.changeMode) {
          this.$store.commit('profile/createDocumentWithTmpId', doc)
        }

        if (doc.tmpId) {
          this.$store.commit('profile/updateDocumentWithTmpId', {
            tmpId: doc.tmpId,
            apiDoc: result,
          })
        }

        this.$refs.observer.reset()

        if (this.changeMode) {
          this.mode = MODE.READONLY
        } else {
          this.$emit('to-all-documents', this.document)
        }
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
    if (this.changeMode) {
      if (!this.doc.id && !this.doc.tmpId) {
        this.createDocument(this.doc)
      } else {
        this.document = { ...this.doc }
        this.mode = MODE.READONLY
      }
      return
    }

    this.documents = this.getDocumentsList()
    this.mode = MODE.READONLY
  },
}
</script>

<style lang="scss" scoped>
.actions {
  display: flex;
  justify-content: end;
}

.chips-row {
  display: flex;
  margin-bottom: 24px;
}

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
