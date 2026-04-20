#!/bin/bash

BASE=/home/paddy/development/ember-addons/react-changeset-webforms
SRC=$BASE/test-app/src/pages
DEST=$BASE/test-app-nextjs/src/app/docs

process_page() {
  local component=$1
  local route=$2
  local srcfile="$SRC/$component.jsx"

  if [ -z "$route" ]; then
    local destfile="$DEST/page.jsx"
  else
    mkdir -p "$DEST/$route"
    local destfile="$DEST/$route/page.jsx"
  fi

  sed \
    -e "s|from '../components/demos/|from '../../../components/demos/|g" \
    -e "s|from '../components/forms/|from '../../../components/forms/|g" \
    -e "s|from '../components/docs-utils'|from '../../../components/docs-utils'|g" \
    -e "s|from 'react-router-dom'|from 'next/link'|g" \
    -e "s|import { Link } from 'next/link'|import Link from 'next/link'|g" \
    -e "s| to=\"/| href=\"/|g" \
    -e "s| to={| href={|g" \
    "$srcfile" > "$destfile"
  echo "Created $destfile"
}

process_page Index ""
process_page BasicUsage "basic-usage"
process_page ConfigurationOptions "configuration-options"
process_page CreatingCustomFields "creating-custom-fields"
process_page ActionHandling "action-handling"
process_page FormSettings "form-settings"
process_page FieldSettings "field-settings"
process_page FormSubmission "form-submission"
process_page FieldValidation "field-validation"
process_page IntegratingCustomValidators "integrating-custom-validators"
process_page ClonableFormFields "clonable-form-fields"
process_page CustomComponents "custom-components"
process_page ManipulatingElementClassNamesAndAttrs "manipulating-element-class-names-and-attrs"
process_page Input "input"
process_page Textarea "textarea"
process_page SingleCheckbox "single-checkbox"
process_page RadioButtonGroup "radio-button-group"
process_page CheckboxGroup "checkbox-group"
process_page StaticContentField "static-content-field"
process_page Clicker "clicker"
process_page HidingAndShowingFields "hiding-and-showing-fields"
process_page FormMethods "form-methods"
process_page FieldMethods "field-methods"
process_page DebugMode "debug-mode"
process_page TestHelpers "test-helpers"
