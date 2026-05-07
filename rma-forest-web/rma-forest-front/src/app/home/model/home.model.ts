export class ServiceModel {
  servicios = {
    inmobiliarias: [
      {
        titulo: 'Evaluaciones de Impacto Ambiental',
        icono: 'assessment',
        descripcion: 'Estudios completos para proyectos inmobiliarios.',
        lista: [
          'Evaluación de Impacto Ambiental',
          'DIA (Declaración de Impacto Ambiental)',
          'Planes de Manejo de Bosque Nativo y plantaciones',
          'Elaboración Línea Base Flora y vegetación'
        ]
      },
      {
        titulo: 'Estudios de Suelo y Territorio',
        icono: 'terrain',
        descripcion: 'Análisis detallados para urbanizaciones.',
        lista: [
          'Estudios de suelo',
          'Ordenamiento territorial',
          'Informes de cumplimiento ambiental (ICA)'
        ]
      }
    ],
    electricas: [
      {
        titulo: 'Gestión de Vegetación',
        icono: 'forest',
        descripcion: 'Gestión sostenible de vegetación en servidumbres eléctricas.',
        lista: [
          'Evaluación de franjas de servidumbre',
          'Estudios vegetacionales',
          'Estudio fitosanitario',
          'Contraparte técnica poda'
        ]
      },
      {
        titulo: 'Prevención de Riesgos',
        icono: 'warning',
        descripcion: 'Seguridad y continuidad operativa.',
        lista: [
          'Estudios de compatibilidad vegetacional',
          'Planificación de faenas',
          'Línea base de flora'
        ]
      }
    ],
    propietarios: [
      {
        titulo: 'Planes de Manejo',
        icono: 'grass',
        descripcion: 'Gestión sustentable de bosques y terrenos.',
        lista: [
          'Planes de manejo',
          'Obras Civiles',
          'Plan de Arborización (MINAGRI)',
          'Regularizaciones',
          'Plan de Manejo de Corrección',
          'Declaración de Bosque Nativo'
        ]
      },
      {
        titulo: 'Servicios Integrales',
        icono: 'verified',
        descripcion: 'Acompañamiento en procesos técnicos y legales.',
        lista: [
          'Estudio de suelo',
          'Regularización parcelas',
          'Reforestación',
          'Presentaciones SAG-MINAGRI'
        ]
      }
    ]
  };
}

export class AboutModel {
    features = [
        {
          id: 'experiencia',
          titulo: '+10 años de experiencia',
          icono: 'verified',
          descripcion: 'Más de una década trabajando en proyectos ambientales y forestales en Chile, con resultados comprobados y clientes satisfechos.',
          stats: [
            { valor: 10, label: 'años', formato: '10+' },
            { valor: 100, label: 'proyectos', formato: '100+' },
            { valor: 95, label: 'satisfacción', formato: '95%' }
          ],
          fondo: 'assets/images/experience-bg.png'
        },
        {
          id: 'equipo',
          titulo: 'Equipo multidisciplinario',
          icono: 'groups',
          descripcion: 'Ingenieros forestales, agrónomos y especialistas en normativa ambiental trabajando juntos.',
          stats: [
            { valor: 5, label: 'profesionales', formato: '5' },
            { valor: 5, label: 'especialidades', formato: '5' }
          ],
          fondo: 'assets/images/team-bg.jpeg'
        },
        {
          id: 'hectareas',
          titulo: 'Más de 3000 hectáreas evaluadas',
          icono: 'forest',
          descripcion: 'Hemos evaluado y gestionado miles de hectáreas, contribuyendo a la conservación y manejo sustentable.',
          stats: [
            { valor: 3000, label: 'hectáreas evaluadas', formato: '3.000+' },
            { valor: 100, label: 'proyectos', formato: '100+' }
          ],
          fondo: 'assets/images/forest-bg.jpg'
        },
        {
          id: 'clientes',
          titulo: '+100 clientes atendidos',
          icono: 'handshake',
          descripcion: 'Desde pequeños propietarios hasta grandes empresas eléctricas e inmobiliarias, confían en nuestros servicios.',
          stats: [
            { valor: 100, label: 'clientes', formato: '100+' },
            { valor: 95, label: 'recomienda', formato: '95%' }
          ],
          fondo: 'assets/images/clients-bg.jpeg'
        }
      ];
      
}
export class MisionModel {
    misionItems = [
        {
          icono: 'psychology',
          titulo: 'Experiencia en terreno',
          descripcion: 'Más de 3000 hectáreas evaluadas y mas de 100 proyectos de recolección de datos ambientales con éxito.'
        },
        {
          icono: 'gavel',
          titulo: 'Conocimiento normativo',
          descripcion: 'Tramitación ante CONAF, SEA y manejo de normativa ambiental vigente.'
        },
        {
          icono: 'spa',
          titulo: 'Vocación sustentable',
          descripcion: 'Compromiso real con el medio ambiente, buscando siempre soluciones que beneficien a todos.'
        }
      ];
}