const { SignatureReflection, ReflectionKind, ReflectionType } = require("typedoc")

// from https://github.com/TypeStrong/typedoc/issues/1662#issuecomment-907717438
exports.load = function(app) {
    // This adds a string representation for function call signatures directly to the JSON output
    app.serializer.addSerializer({
        supports(x) {
            return x instanceof SignatureReflection;
        },
        priority: 0,
        toObject(signature, obj) {
            // name of the function
            const parts = [signature.name];

            // adds `new` if it's a constructor
            if (signature.kind === ReflectionKind.ConstructorSignature) {
                if (signature.flags.isAbstract) parts.push("abstract ")
                parts.push("new ")
            }

            // if it's a generic function, adds the type parameters
            if (signature.typeParameters) {
                parts.push("<")
                let first = true
                for (const typeParam of signature.typeParameters) {
                    if (!first) parts.push(", ")
                    parts.push(typeParam.name)
                    if (typeParam.type) {
                        parts.push(" extends ", typeParam.type.toString())
                    }
                    if (typeParam.default) {
                        parts.push(" = ", typeParam.default.toString())
                    }
                    first = false
                }
                parts.push(">")
            }

            // adds the parameters
            parts.push("(")
            let first = true
            for (const param of (signature.parameters || [])) {
                if (!first) parts.push(", ")
                parts.push(param.name, ": ", param.type.toString())
                first = false
            }
            parts.push("): ")

            // adds the return type
            parts.push(signature.type.toString())

            obj.stringifiedSignature = parts.join("")
            return obj
        }
    });

    // This adds a stringified representation of object types to the JSON output
    app.serializer.addSerializer({
        supports(x) {
            return x instanceof ReflectionType;
        },
        priority: 1,
        toObject: (x, obj) => {
            let oldStringify = x.stringify;
            x.stringify = () => {
                if (!x.declaration.children) {
                    if (oldStringify.call(x) === "Object") {
                        // HACK: usually it's an empty object
                        return '{}'
                    }
                    return oldStringify.call(x);
                }

                return `{ ${x.declaration.children.map(ch => `${ch.name}: ${ch.type.stringify()}`).join(", ")} }`;
            }
            return obj
        }
    });

    // This adds a stringified representation of interface types to the JSON output
    app.serializer.addSerializer({
        supports(x) {
            return (x.kind === ReflectionKind.Interface)
        },
        priority: 0,
        toObject: (x, obj) => {
            obj.stringifiedInterface = `interface ${x.name} {\n${x.children.map(c => `  ${c.name}: ${c.type.toString()},`).join('\n')}\n}`
            return obj;
        }
    });
}