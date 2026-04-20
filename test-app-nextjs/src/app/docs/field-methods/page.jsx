import FieldMethodsExampleOneDemo from '../../../components/demos/FieldMethodsExampleOneDemo.jsx';
import FieldMethodsExampleTwoDemo from '../../../components/demos/FieldMethodsExampleTwoDemo.jsx';
import FieldMethodsExampleThreeDemo from '../../../components/demos/FieldMethodsExampleThreeDemo.jsx';
import FieldMethodsExampleFourDemo from '../../../components/demos/FieldMethodsExampleFourDemo.jsx';
import FieldMethodsExampleSixDemo from '../../../components/demos/FieldMethodsExampleSixDemo.jsx';
import FieldMethodsExampleSevenDemo from '../../../components/demos/FieldMethodsExampleSevenDemo.jsx';

export default function FieldMethods() {
  return (
    <>
      <div className="docs-md">
        <h1 id="field-methods" class="docs-md__h1">
          Field methods
        </h1>
        <h2 id="validate" class="docs-md__h2">
          <a href="#validate" class="heading-anchor">
            <code>validate</code>
          </a>
        </h2>
        <p>
          Arguments: (<code>opts</code>)
        </p>
        <p>
          Validates the field if it is not omitted (See{' '}
          <a href="/docs/hiding-and-showing-fields" class="docs-md__a">
            Hiding and showing fields
          </a>
          ).
        </p>

        <FieldMethodsExampleOneDemo />
        <p>
          If you would like to only revalidate fields which have already been
          validated, set <code>opts.skipUnvalidated</code> to <code>true</code>.
        </p>

        <FieldMethodsExampleTwoDemo />
        <h2 id="setomission" class="docs-md__h2">
          <a href="#setomission" class="heading-anchor">
            <code>setOmission</code>
          </a>
        </h2>
        <p>
          Allows you to updated whether the field is omitted by passing a
          boolean value.
        </p>
        <p>
          See{' '}
          <a
            href="/docs/hiding-and-showing-fields#the-setomission-method"
            class="docs-md__a"
          >
            /docs/hiding-and-showing-fields#the-setomission-method
          </a>
          .
        </p>

        <FieldMethodsExampleThreeDemo />
        <h2 id="updatevalue" class="docs-md__h2">
          <a href="#updatevalue" class="heading-anchor">
            <code>updateValue</code>
          </a>
        </h2>
        <p>
          Arguments: (<code>value</code>)
        </p>
        <p>Updates the value of the field.</p>
        <p>
          The <code>value</code> argument is the value to update the field to.
        </p>

        <FieldMethodsExampleFourDemo />
        <h2 id="reset" class="docs-md__h2">
          <a href="#reset" class="heading-anchor">
            <code>reset</code>
          </a>
        </h2>
        <p>
          Discards any unsaved changes to the field's value, and unvalidates the
          field.
        </p>

        <FieldMethodsExampleSixDemo />
        <h2 id="pusherrors" class="docs-md__h2">
          <a href="#pusherrors" class="heading-anchor">
            <code>pushErrors</code>
          </a>
        </h2>
        <p>
          Allows you to push errors onto a field. This will force the field to
          show the error and display as invalid in the UI.
        </p>

        <FieldMethodsExampleSevenDemo />
      </div>
    </>
  );
}
