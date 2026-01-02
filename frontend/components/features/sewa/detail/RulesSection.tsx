import { PropertyDetail } from "@/data/properties";

interface RulesSectionProps {
    rules: PropertyDetail['rules'];
}

export const RulesSection = ({ rules }: RulesSectionProps) => {
    return (
        <div className="space-y-8">
            <h3 className="text-lg font-bold text-neutral-900 mb-6">Tata Tertib</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                {rules.map((rule, idx) => (
                    <div key={idx} className="space-y-3">
                        <h4 className="font-bold text-neutral-900">{rule.title}</h4>
                        <ul className="space-y-2">
                            {rule.items.map((item, itemIdx) => (
                                <li key={itemIdx} className="text-sm text-neutral-600 leading-relaxed">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};
