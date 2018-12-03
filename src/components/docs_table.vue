<template>
    <div class="docs-table" ref="docs">
        <sui-header size='big' color='blue'>Documentation </sui-header>
        <sui-accordion exclusive styled class="doc-accordion">
            <div v-for="(instruction, index) in instructions_docs" :key="index">
                <sui-accordion-title>
                    <sui-icon name='dropdown' />
                    {{instruction.name}}
                </sui-accordion-title>
                <sui-accordion-content>
                    <sui-divider horizontal> Description </sui-divider>
                    <p> {{instruction.description}} </p>

                    <sui-divider horizontal> Paramètres obligatoires </sui-divider>
                    <sui-table compact color="red">
                        <sui-table-header>
                            <sui-table-header-cell> Noms </sui-table-header-cell>
                            <sui-table-header-cell> Type </sui-table-header-cell>
                            <sui-table-header-cell> Description </sui-table-header-cell>
                        </sui-table-header>

                        <sui-table-row v-for="(param, index) in instruction.mandatory_params" :key='param.name + "mand" + index'>
                            <sui-table-cell> {{param.name}}</sui-table-cell>
                            <sui-table-cell> {{param.type}}</sui-table-cell>
                            <sui-table-cell> {{param.description}}</sui-table-cell>
                        </sui-table-row>
                    </sui-table>

                    <sui-divider horizontal> Paramètres optionelles </sui-divider>
                    <sui-table compact color="blue">
                        <sui-table-header>
                            <sui-table-header-cell> Noms </sui-table-header-cell>
                            <sui-table-header-cell> Type </sui-table-header-cell>
                            <sui-table-header-cell> Description </sui-table-header-cell>
                            <sui-table-header-cell> Valeur de base </sui-table-header-cell>
                        </sui-table-header>

                        <sui-table-row v-for="param in instruction.optionnal_params" :key='param.name + "opt"'>
                            <sui-table-cell> {{param.name}}</sui-table-cell>
                            <sui-table-cell> {{param.type}}</sui-table-cell>
                            <sui-table-cell> {{param.description}}</sui-table-cell>
                            <sui-table-cell> {{param.base_value}}</sui-table-cell>
                        </sui-table-row>
                    </sui-table>

                    <sui-divider horizontal> Exemples </sui-divider>
                    <sui-table basic="very">
                        <sui-table-row v-for="exemple in instruction.exemples" :key='exemple +"ex"'>
                            <sui-table-cell> <span v-html="exemple"></span> </sui-table-cell>
                        </sui-table-row>
                    </sui-table>
                </sui-accordion-content>
            </div>
        </sui-accordion>
    </div>
</template>


<script>
    
export default {
    name: 'docs_table',
    data: function () {
        return {
            instructions_docs: [
                {
                    name: "Tracer",
                    mandatory_params: [
                        {
                            name: "destination",
                            type: "number",
                            description: "longeur du trait à tracer"
                        },
                        {
                            name: "destination",
                            type: "coordonnées",
                            description: "coordonnées de destination"
                        }
                    ],
                    optionnal_params: [
                        {
                            name: "couleur",
                            type: "couleur",
                            description: "couleur du trait",
                            base_value: "#000000"
                        },
                        {
                            name: "largeur",
                            type: "number",
                            description: "largeur du trait en pixels",
                            base_value: "1" 
                        },
                        {
                            name: "arrondi",
                            type: "booleen",
                            description: "arrondi au extrémitées de la ligne",
                            base_value: "0"
                        }
                    ],
                    description: "Trace un trait en déplaçant la tortue entre sa position actuelle et la destination",
                    exemples: [
                        'tracer <span class="obi">200 </span>;',
                        'tracer <span class="obi">200:100 </span> <span class="opt">c:#1124AA l:5 a:1 </span>;',
                        'Tracer <span class="obi">200 </span> <span class="opt">a:5 l:6 </span>;'
                    ]
                },
                {
                    name: "Tourner",
                    mandatory_params: [
                        {
                            name: "angle",
                            type: "number",
                            description: "angle à ajouter à l'angle actuel de la tortue"
                        }
                    ],
                    optionnal_params: [
                        {
                            name: "unités",
                            type: "chaine de caractères",
                            description: "unités de l'angle (degrées ou radians)",
                            base_value: "degrées"
                        }
                    ],
                    description: "Change l'angle de la tortue",
                    exemples: [
                        'tourner <span class="obi">90</span>;',
                        'Tourner <span class="obi">30</span> <span class="opt">u:degrées</span>;',
                        'tourner <span class="obi">PI/2</span> <span class="opt">u:radians</span>;'
                    ]
                },
                {
                    name: "Déplacer",
                    mandatory_params: [
                        {
                            name: "destination",
                            type: "number",
                            description: "espace de déplacement de la tortue suivant l'angle de la tortue"
                        },
                        {
                            name: "destination",
                            type: "coordonnées",
                            description: "coordonnées de destination de la tortue"
                        }
                    ],
                    optionnal_params: [],
                    description: "Déplacer la tortue sans tracer de trait",
                    exemples: [
                        'déplacer <span class="obi">200:100</span>;',
                        'Deplacer <span class="obi">267</span>;',
                        'deplacer <span class="obi">600:300</span>;'
                    ]
                },
                {
                    name: "Rectangle",
                    mandatory_params: [
                        {
                            name: "largeur",
                            type: "number",
                            description: "largeur du rectangle (sens de la tortue)"
                        },
                        {
                            name: "longeur",
                            type: "number",
                            description: "longeur du rectangle (sens perpendiculaire de la tortue)"
                        }
                    ],
                    optionnal_params: [
                        {
                            name: "couleur",
                            type: "couleur",
                            description: "couleur du rectangle",
                            base_value: "#000000"
                        },
                        {
                            name: "largeur",
                            type: "number",
                            description: "largeur du cadre du rectangle",
                            base_value: "1"
                        },
                        {
                            name: "arrondi",
                            type: "Booleen",
                            description: "arrondi aux angles du rectangle",
                            base_value: "0"
                        },
                        {
                            name: "remplissage",
                            type: "Booleen",
                            description: "remplissage ou non du rectangle",
                            base_value: "0"
                        }
                    ],
                    description: "Trace un rectangle autour de la tortue",
                    exemples: [
                        'rectangle <span class="obi">90 600</span> <span class="opt">r:1</span>;',
                        'Rectangle <span class="obi">100 200</span> <span class="opt">c:#11da54 l:0</span>;',
                        'rectangle <span class="obi">20 20</span> <span class="opt"></span>;'
                    ]
                },
                {
                    name: "Cercle",
                    mandatory_params: [
                        {
                            name: "rayon",
                            type: "number",
                            description: "rayon du cercle"
                        }
                    ],
                    optionnal_params: [
                        {
                            name: "couleur",
                            type: "couleur",
                            description: "couleur du remplissage du cercle",
                            base_value: "#000000"
                        },
                        {
                            name: "largeur du cadre",
                            type: "number",
                            description: "largeur du cadre du cercle",
                            base_value: "1"
                        },
                        {
                            name: "remplissage",
                            type: "Booleen",
                            description: "remplissage ou non du cercle",
                            base_value: "0"
                        }
                    ],
                    description: "Trace un cercle centrée sur la tortue",
                    exemples: [
                        'cercle <span class="obi">120</span> <span class="opt">l:1</span>;',
                        'cercle <span class="obi">10</span> <span class="opt">c:#AADD00 l:0</span>;',
                        'Cercle <span class="obi">70</span> <span class="opt"></span>;'
                    ]
                },
                {
                    name: "Ellipse",
                    mandatory_params: [
                        {
                            name: "grand rayon",
                            type: "number",
                            description: "grand rayon du cercle"
                        },
                        {
                            name: "petit rayon",
                            type: "number",
                            description: "petit rayon du cercle"
                        }
                    ],
                    optionnal_params: [
                        {
                            name: "couleur",
                            type: "couleur",
                            description: "couleur du remplissage du cercle",
                            base_value: "#000000"
                        },
                        {
                            name: "largeur du cadre",
                            type: "number",
                            description: "largeur du cadre de l'ellipse",
                            base_value: "1"
                        },
                        {
                            name: "remplissage",
                            type: "Booleen",
                            description: "remplissage ou non de l'ellispe",
                            base_value: "0"
                        }
                    ],
                    description: "Trace une ellipse centrée sur la tortue",
                    exemples: [
                        'Ellipse <span class="obi">90 100</span> <span class="opt">l:1</span>;',
                        'Ellipse <span class="obi">10 100</span> <span class="opt">c:#AADD00 l:0</span>;',
                        'ellipse <span class="obi">500 60</span> <span class="opt">r:1 c:#AADD11</span>;'
                    ]
                },
                {
                    name: "Couleur_fond",
                    mandatory_params: [
                        {
                            name: "couleur fond",
                            type: "couleur",
                            description: "Couleur de fond de l'image"
                        }
                    ],
                    optionnal_params: [],
                    description: "Change la couleur de fond de l'image",
                    exemples: [
                        'Couleur_fond <span class="obi">#AE4D52</span>;',
                        'couleur_fond <span class="obi">#AA12E5</span>;',
                        'couleur_fond <span class="obi">#445122</span>;'
                    ]
                }
            ]
        }
    }
}
</script>


<style>
.obi {
    color : red;
}
.opt {
    color : blue;
}
.docs-table {
    text-align: center;
}
.doc-accordion{
    width:100%;
    margin-left: auto;
    margin-right: auto;
}
</style>